import express from "express";
import cors from "cors";
import redis from "redis";
import { prisma } from "@/src/config/prisma";
import { authRoutes } from "@/src/routes/authRoutes";

const app = express();
app.use(cors());

// Routes
app.use("/auth", authRoutes);

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
