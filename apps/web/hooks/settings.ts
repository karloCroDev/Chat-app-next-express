import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { SettingsResponse } from "@repo/types";
import { updateUser } from "@/lib/data/settings";

export const useUpdateUser = (
  options?: UseMutationOptions<SettingsResponse, Error, FormData>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (values: FormData) => updateUser(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
