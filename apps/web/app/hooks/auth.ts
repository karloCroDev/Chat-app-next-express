import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { clientSession, login, logout, register } from "@/lib/data/auth";
import { LoginArgs, RegisterArgs } from "@repo/schemas";
import { cache } from "react";
import { LoginResponse, RegisterResponse } from "@repo/types";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: cache(clientSession),
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, Error, LoginArgs>
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
  options?: UseMutationOptions<RegisterResponse, Error, RegisterArgs>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (values: RegisterArgs) => register(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
