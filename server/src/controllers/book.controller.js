import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  const imageUrl = req.file?.path;

  await Book.create({
    ownerId: req.userId,
    ...req.body,
    imageUrl,
  });

  res.json({ message: "book created" });
};

export const getMyBooks = async (req, res) => {
  const books = await Book.find({ ownerId: req.userId });
  res.json(books);
};
