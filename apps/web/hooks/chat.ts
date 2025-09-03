import { addMessage } from "@/lib/data/chat";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AddMessageArgs } from "@repo/schemas";
import { listChat } from "@/lib/actions/chats";
import { ChatResponse } from "@repo/types";

export const useListChats = ({
  initialData,
  username,
}: {
  username: string;
  initialData: ChatResponse;
}) => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => listChat(username),
    staleTime: 5 * 60 * 1000,
    initialData,
  });
};

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
