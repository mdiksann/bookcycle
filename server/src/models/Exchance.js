import mongoose from "mongoose";

const ExchangeSchema = new mongoose.Schema({
  requesterId: String,
  targetBookId: String,
  offerBookId: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Exchange", ExchangeSchema);
        