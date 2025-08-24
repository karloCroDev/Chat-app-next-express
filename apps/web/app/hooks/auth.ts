import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { session, login, register } from "@/lib/data/auth";
import { LoginArgs, RegisterArgs } from "@repo/schemas";
import { cache } from "react";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => cache(session),
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogin = (
  options?: UseMutationOptions<
    {
      success: boolean;
      message?: string;
      errors: Record<keyof RegisterArgs, string>;
    },
    Error,
    LoginArgs
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (values: LoginArgs) => login(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useRegister = (
  options?: UseMutationOptions<
    {
      success: boolean;
      message?: string;
      errors: Record<keyof RegisterArgs, string>;
    },
    Error,
    RegisterArgs
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (values: RegisterArgs) => register(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
