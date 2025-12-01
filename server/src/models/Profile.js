import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    fullname: String,
    address: String,
}, { timestamps: true });

export default mongoose.model("Profile", ProfileSchema);