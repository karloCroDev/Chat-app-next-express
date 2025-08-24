import express from "express";
import { Router } from "express";
import { login } from "@/src/controllers/auth/login";
import { register } from "@/src/controllers/auth/register";
import { logout } from "@/src/controllers/auth/logout";
import { session } from "@/src/controllers/auth/session";

export const authRoutes = Router();

authRoutes.use(express.json());

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/session", session);
