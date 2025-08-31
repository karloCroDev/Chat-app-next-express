import express from "express";
import { Router } from "express";
import { settings } from "@/src/controllers/chat/settings";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import multer, { memoryStorage } from "multer";
import { listUsers } from "@/src/controllers/chat/list-users";
import { sendRequest } from "@/src/controllers/chat/send-request";

const storage = memoryStorage();
const upload = multer({ storage });

export const chatRoutes = Router();

chatRoutes.use(express.json());

chatRoutes.patch("/settings", upload.single("image"), settings);
chatRoutes.post("/list-users", listUsers);
chatRoutes.post("/send-request", sendRequest);
