import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { authRequired } from "./middlewares/auth.js";
import profileRoutes from "./routes/profile.routes.js";
import bookRoutes from "./routes/book.routes.js";
import exchangeRoutes from "./routes/exchange.routes.js";

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(express.json());

// Serve static files untuk image uploads
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

app.get("/api/profile", authRequired, (req, res) => {
  res.json({ message: `Hello user ${req.userId}` });
});

app.use("/api/profile", profileRoutes);

app.use("/api/books", bookRoutes);

app.use("/api/exchanges", exchangeRoutes);

export default app;
