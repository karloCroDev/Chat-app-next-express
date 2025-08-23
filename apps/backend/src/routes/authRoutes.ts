import express from "express";
import { Router } from "express";
import {
  registerSchema,
  RegisterArgs,
  LoginArgs,
  loginSchema,
} from "@repo/schemas";
import { zodErrorDetecter } from "@/src/lib/zodDetectionError";
import bcrypt from "bcrypt";
import { prisma } from "@/src/config/prisma";
import jwt from "jsonwebtoken";
import { error } from "console";

export const authRoutes = Router();

authRoutes.use(express.json());

authRoutes.post("/register", async (req, res) => {
  try {
    const data: RegisterArgs = req.body;

    const validateData = registerSchema.safeParse(data);

    if (!validateData.success) {
      return res.json({
        errors: zodErrorDetecter(validateData.error),
      });
    }

    const hashedPassword = bcrypt.hashSync(validateData.data.password, 10);
    const user = await prisma.user.create({
      data: {
        username: validateData.data.username,
        email: validateData.data.email,
        password: hashedPassword,
      },
    });

    if (!user) {
      return res.status(200).json({
        error: "Already existing user, please login!",
      });
    }

    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const data: LoginArgs = req.body;
    const validateData = loginSchema.safeParse(data);

    if (!validateData.success) {
      return res.status(400).json({
        errors: zodErrorDetecter(validateData.error),
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: validateData.data.email,
      },
    });

    if (!user) return res.status(400).json({ error: "Invalid email" });

    const passwordIsValid = bcrypt.compareSync(
      validateData.data.password,
      user.password
    );

    if (!passwordIsValid)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
  }
  res.send("sss");
});
