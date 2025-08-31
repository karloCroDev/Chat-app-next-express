import { useQuery } from "@tanstack/react-query";

import { ListUsersArgs } from "@repo/schemas";
import { listUsers } from "@/lib/data/list-users";

export const useListUsers = (values?: ListUsersArgs) => {
  return useQuery({
    queryKey: ["list-users"],
    queryFn: () => listUsers(values),
  });
};
