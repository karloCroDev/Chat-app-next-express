import express from "express";
import { Router } from "express";
import { stripeWebhook } from "@/src/controllers/stripe-webhook/stripe";

export const paymentRoutes = Router();

paymentRoutes.use(express.json());

paymentRoutes.post("/checkout", stripeWebhook);
