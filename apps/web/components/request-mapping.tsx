"use client";

import { SidebarUser } from "@/components/sidebar-user";
import { Input } from "@/components/ui/input";
import { SidebarMenuItem } from "@/components/ui/sidebar";

import { useListRequests } from "@/hooks/sidebar";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { UsersSidebar } from "@repo/types";
import { SearchIcon } from "lucide-react";
import * as React from "react";

export const RequestMapping = withReactQueryProvider(() => {
  const { data: listRequests, isLoading } = useListRequests();

  const [value, setValue] = React.useState("");

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
        {listRequests &&
          listRequests
            .filter((val) =>
              val.username.toLowerCase().includes(value.toLowerCase())
            )
            .map(({ bio, id, image, username, isOnline }) => (
              <SidebarMenuItem id={id} key={id}>
                <SidebarUser
                  bio={bio}
                  id={id}
                  image={image}
                  username={username}
                  isOnline={isOnline}
                  isRequest
                />
              </SidebarMenuItem>
            ))}
      </div>
    </>
  );
});
