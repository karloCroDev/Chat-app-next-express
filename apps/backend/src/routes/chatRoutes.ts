import express from "express";
import { Router } from "express";
import { settings } from "@/src/controllers/chat/settings";
import { authMiddleware } from "@/src/middleware/authMiddleware";

export const chatRoutes = Router();

chatRoutes.use(express.json());

chatRoutes.patch("/settings", settings);
