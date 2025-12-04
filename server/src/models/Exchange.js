import mongoose from "mongoose";

const ExchangeSchema = new mongoose.Schema(
  {
    requesterId: { type: String, required: true },
    responderId: { type: String, required: true }, 
    offeredBooks: [{ type: String, required: true }], 
    requestedBooks: [{ type: String, required: true }], 
    totalOfferedValue: { type: Number, default: 0 },
    totalRequestedValue: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending','countered','accepted','rejected','completed','cancelled'],
      default: "pending",
    },
    messages: [{
    from: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
  }, { timestamps: true }
);

export default mongoose.model("Exchange", ExchangeSchema);