import { type User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req;

  if (!user || user.role !== "ADMIN") {
    return res.status(400).json({ message: "Forbidden: Admins only" });
  }

  next();
}
