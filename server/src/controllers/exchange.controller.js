import Exchange from "../models/Exchance.js";

export const createExchange = async (req, res) => {
  const { targetBookId, offerBookId } = req.body;

  await Exchange.create({
    requesterId: req.userId,
    targetBookId,
    offerBookId,
  });

  res.json({ message: "exchange requested" });
};
