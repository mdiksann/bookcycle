import mongoose from "mongoose";
import Exchange from "../models/Exchange.js";
import Book from "../models/Book.js";

export const computeTotals = async (offeredIds, requestedIds) => {
  const offeredBooks = await Book.find({ _id: { $in: offeredIds } });
  const requestedBooks = await Book.find({ _id: { $in: requestedIds } });

  const totalOfferedValue = offeredBooks.reduce((s, b) => s + (b.estimatedValue || 0), 0);
  const totalRequestedValue = requestedBooks.reduce((s, b) => s + (b.estimatedValue || 0), 0);

  return { totalOfferedValue, totalRequestedValue };
};

export const createExchange = async ({ requesterId, responderId, offeredBooks, requestedBooks }) => {
  // validate books exist and owners
  const offered = await Book.find({ _id: { $in: offeredBooks } });
  const requested = await Book.find({ _id: { $in: requestedBooks } });

  if (offered.length !== offeredBooks.length) throw new Error("Some offered books not found");
  if (requested.length !== requestedBooks.length) throw new Error("Some requested books not found");

  // check ownership
  for (const b of offered) {
    if (b.ownerId !== requesterId) throw new Error("You do not own one of the offered books");
    if (b.status !== "available") throw new Error("One of the offered books is not available");
  }
  for (const b of requested) {
    if (b.ownerId !== responderId) throw new Error("One of the requested books is not owned by responder");
    if (b.status !== "available") throw new Error("One of the requested books is not available");
  }

  const { totalOfferedValue, totalRequestedValue } = await computeTotals(offeredBooks, requestedBooks);

  const exchange = await Exchange.create({
    requesterId,
    responderId,
    offeredBooks,
    requestedBooks,
    totalOfferedValue,
    totalRequestedValue,
    status: "pending",
  });

  return exchange;
};

export const listIncoming = async (userId) => {
  return Exchange.find({ responderId: userId }).sort({ createdAt: -1 });
};

export const listOutgoing = async (userId) => {
  return Exchange.find({ requesterId: userId }).sort({ createdAt: -1 });
};

export const getExchangeById = async (id) => {
  return Exchange.findById(id);
};

export const acceptExchange = async (exchangeId, actingUserId) => {
  const ex = await Exchange.findById(exchangeId);
  if (!ex) throw new Error("Exchange not found");
  if (ex.responderId !== actingUserId) throw new Error("Only responder can accept");
  if (ex.status !== "pending" && ex.status !== "countered") throw new Error("Exchange not in pending/countered");

  // Check availability again
  const offered = await Book.find({ _id: { $in: ex.offeredBooks } });
  const requested = await Book.find({ _id: { $in: ex.requestedBooks } });

  // ensure status and ownership
  for (const b of offered) if (b.status !== "available") throw new Error("Offered book not available");
  for (const b of requested) if (b.status !== "available") throw new Error("Requested book not available");

  // mark books: offered -> traded, requested -> traded
  await Book.updateMany({ _id: { $in: ex.offeredBooks } }, { $set: { status: "traded" } });
  await Book.updateMany({ _id: { $in: ex.requestedBooks } }, { $set: { status: "traded" } });

  ex.status = "accepted";
  await ex.save();

  return ex;
};

export const rejectExchange = async (exchangeId, actingUserId) => {
  const ex = await Exchange.findById(exchangeId);
  if (!ex) throw new Error("Exchange not found");
  if (ex.responderId !== actingUserId) throw new Error("Only responder can reject");
  if (ex.status !== "pending" && ex.status !== "countered") throw new Error("Exchange not in pending/countered");

  ex.status = "rejected";
  await ex.save();
  return ex;
};

export const cancelExchange = async (exchangeId, actingUserId) => {
  const ex = await Exchange.findById(exchangeId);
  if (!ex) throw new Error("Exchange not found");
  // requester or responder can cancel before accepted
  if (![ex.requesterId, ex.responderId].includes(actingUserId)) throw new Error("Not participant");
  if (["accepted", "completed"].includes(ex.status)) throw new Error("Cannot cancel after accepted/completed");

  ex.status = "cancelled";
  await ex.save();
  return ex;
};
