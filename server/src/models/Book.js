import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  title: String,
  author: String,
  description: String,
  category: String,
  images: String,
  condition: { type: String, enum: ['new','good','fair','poor'], default: 'good' },
  estimatedValue: { type: Number, default: 0 },
  status: { type: String, enum: ['available','reserved','traded'], default: 'available' }
}, { timestamps: true });

export default mongoose.model("Book", BookSchema);
    