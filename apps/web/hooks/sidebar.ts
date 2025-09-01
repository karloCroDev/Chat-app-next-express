import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { ListUsersArgs } from "@repo/schemas";
import { listUsers } from "@/lib/data/list-users";
import { SendRequestResponse } from "@repo/types";
import { sendRequest } from "@/lib/data/send-request";
import { listRequests } from "@/lib/data/list-requests";

export const useListUsers = (values?: ListUsersArgs) => {
  return useQuery({
    queryKey: ["list-users"],
    queryFn: () => listUsers(values),
  });
};

export const useListRequests = () => {
  return useQuery({
    queryKey: ["list-requests"],
    queryFn: listRequests,
  });
};
export const useListFriends = () => {
  return useQuery({
    queryKey: ["list-friends"],
    queryFn: listRequests,
  });
};

export const useSendRequest = (
  options?: UseMutationOptions<SendRequestResponse, Error, string>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (values: string) => sendRequest(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["list-users"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
