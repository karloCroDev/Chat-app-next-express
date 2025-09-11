import { resend } from "@/src/config/resend";
import { Request, Response } from "express";

export async function forgotPassword(req: Request, res: Response) {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: ["delivered@resend.dev"],
    subject: "hello world",
    html: "<strong>it works!</strong>", // Karlo dodaj shared components i dodaj react email i ondaj dodaj mail
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
}
