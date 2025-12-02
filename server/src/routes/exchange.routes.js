import { Router } from "express";
import auth from "../middlewares/auth.js";
import { createExchange } from "../controllers/exchange.controller.js";

const router = Router();

router.post("/", auth, createExchange);

export default router;
