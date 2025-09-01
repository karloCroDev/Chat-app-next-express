"use client ";

import { Input } from "@/components/ui/input";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarUser } from "@/components/sidebar-user";
import { useListUsers } from "@/hooks/sidebar";
import { useDebounce } from "@/hooks/useDebounce";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { SearchIcon } from "lucide-react";
import React from "react";

export const AddFriendsMapping = withReactQueryProvider(() => {
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value);

  console.log("Debounce", debouncedValue);

  React.useEffect(() => {
    refetch();
  }, [debouncedValue]);

  const {
    refetch,
    data: listUsers,
    isLoading,
  } = useListUsers({
    searchValue: value,
    limit: 10,
    offset: 0,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <SidebarMenuItem>
        <div className="flex items-center gap-4">
          <Input onChange={(e) => setValue(e.target.value)} />
          <SearchIcon className="size-6" />
        </div>
      </SidebarMenuItem>
      <div className="flex flex-col gap-4 mt-4">
        {listUsers &&
          listUsers.map(({ bio, id, image, username, isOnline }) => (
            <SidebarMenuItem id={id} key={id}>
              <SidebarUser
                bio={bio}
                id={id}
                image={image}
                username={username}
                isOnline={isOnline}
              />
            </SidebarMenuItem>
          ))}
      </div>
    </>
  );
});
