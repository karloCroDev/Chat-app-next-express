import express from "express";
import { Router } from "express";
import { login } from "@/src/controllers/auth/login";
import { register } from "@/src/controllers/auth/register";
import { logout } from "@/src/controllers/auth/logout";
import { session } from "@/src/controllers/auth/session";
import { forgotPassword } from "@/src/controllers/auth/forgot-password";
import { resetPassword } from "@/src/controllers/auth/reset-password";
import { verifyTokenOtp } from "@/src/controllers/auth/verify-token-otp";

export const authRoutes = Router();

authRoutes.use(express.json());

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/session", session);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/verify-token-otp", verifyTokenOtp);
