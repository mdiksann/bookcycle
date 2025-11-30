import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  const data = await Profile.findOne({ userId: req.user.id });
  res.json(data);
};

export const updateProfile = async (req, res) => {
  await Profile.findOneAndUpdate({ userId: req.user.id }, req.body, { upsert: true });

  res.json({ message: "updated" });
};
