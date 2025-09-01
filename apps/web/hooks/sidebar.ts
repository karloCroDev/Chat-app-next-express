import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AcceptRequestArgs, ListUsersArgs } from "@repo/schemas";
import {
  listUsers,
  sendRequest,
  listRequests,
  rejectRequest,
  acceptRequest,
  listFriends,
} from "@/lib/data/sidebar";
import { SendRequestResponse } from "@repo/types";

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
    queryFn: listFriends,
  });
};

export const useSendRequest = (
  options?: UseMutationOptions<SendRequestResponse, Error, string>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["send-request"],
    mutationFn: (values: string) => sendRequest(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["list-users"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useAccpectRequest = (
  options?: UseMutationOptions<SendRequestResponse, Error, AcceptRequestArgs>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["accept-request"],
    mutationFn: (values: AcceptRequestArgs) => acceptRequest(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["list-requests"] });
      await queryClient.invalidateQueries({ queryKey: ["list-friends"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};

export const useRejectRequest = (
  options?: UseMutationOptions<SendRequestResponse, Error, string>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["reject-request"],
    mutationFn: (values: string) => rejectRequest(values),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: ["list-friends"] });
      await options?.onSuccess?.(...args);
    },
    ...options,
  });
};
