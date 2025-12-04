import * as exchangeService from "../services/exchange.service.js";

export const createExchange = async (req, res) => {
  try {
    const requesterId = req.userId;
    const { responderId, offeredBooks = [], requestedBooks = [] } = req.body;

    if (!responderId) return res.status(400).json({ message: "responderId is required" });
    if (!offeredBooks.length || !requestedBooks.length) return res.status(400).json({ message: "offeredBooks and requestedBooks required" });

    const ex = await exchangeService.createExchange({ requesterId, responderId, offeredBooks, requestedBooks });
    return res.status(201).json(ex);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getIncoming = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await exchangeService.listIncoming(userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOutgoing = async (req, res) => {
  try {
    const userId = req.userId;
    const data = await exchangeService.listOutgoing(userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const accept = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const ex = await exchangeService.acceptExchange(id, userId);
    res.json(ex);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const reject = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const ex = await exchangeService.rejectExchange(id, userId);
    res.json({ message: "rejected", exchange: ex });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const cancel = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const ex = await exchangeService.cancelExchange(id, userId);
    res.json({ message: "cancelled", exchange: ex });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
