import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { authRoutes } from "@/src/routes/authRoutes";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { adminMiddleware } from "@/src/middleware/adminMiddleware";
import { chatRoutes } from "@/src/routes/chatRoutes";

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
app.use("/chat", authMiddleware, chatRoutes);

// Test
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route" });
});

app.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "This is a ADMIN protected route" });
});

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
