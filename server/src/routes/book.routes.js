import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from "../utils/upload.js";
import { createBook, getMyBooks } from "../controllers/book.controller.js";

const router = Router();

router.get("/", auth, getMyBooks);
router.post("/", auth, upload.single("image"), createBook);

export default router;
