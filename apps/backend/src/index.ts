import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import redis from "redis";
import { prisma } from "@/src/config/prisma";
import { authRoutes } from "@/src/routes/authRoutes";
import { authMiddleware } from "@/src/middleware/authMiddleware";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route" });
});

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
