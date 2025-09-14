import { type Response, Request } from "express";

export function oAuthGoogle(req: Request, res: Response) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out" });
}
