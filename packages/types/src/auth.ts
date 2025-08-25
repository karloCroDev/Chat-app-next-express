import { LoginArgs, RegisterArgs } from "@/schemas";

// Login/Register response

type AuthResponse = {
  success: boolean;
  message: string;
};

export type LoginResponse = AuthResponse & {
  errors?: Record<keyof LoginArgs, string>;
};

export type RegisterResponse = AuthResponse & {
  errors?: Record<keyof RegisterArgs, string>;
};

// Session (User)
export type User = {
  id: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
};

export type SessionSuccessResponse = User & {
  message: string;
  success: true;
};

// See if I want to handle this with toast messgaes or something simmilar!
type SessionErrorResponse = {
  message?: string;
  error?: string;
  success: false;
};
