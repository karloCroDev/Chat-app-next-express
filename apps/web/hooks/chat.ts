import { addMessage } from "@/lib/data/chat";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AddMessageArgs } from "@repo/schemas";

export const useAddMessage = (
  options?: UseMutationOptions<
    { message: string; success: boolean },
    Error,
    AddMessageArgs
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-chat"],
    mutationFn: (values: AddMessageArgs) => addMessage(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
