import express from "express";
import { Router } from "express";

export const authRoutes = Router();

authRoutes.post("/register", (req, res) => {
  res.send("Register route");
});

authRoutes.post("/login", (req, res) => {
  res.send("sss");
});
