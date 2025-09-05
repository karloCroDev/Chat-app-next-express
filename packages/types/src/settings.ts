import { SettingsArgs } from "@repo/schemas/index";

export type SettingsResponse = {
  success: boolean;
  message: string;
  presignedUrl?: string;
} & { errors?: Record<keyof SettingsArgs, string> };
