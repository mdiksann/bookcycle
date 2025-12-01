import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  title: String,
  author: String,
  category: String,
  value: String,
  imageUrl: String
}, { timestamps: true });

export default mongoose.model("Book", BookSchema);
    