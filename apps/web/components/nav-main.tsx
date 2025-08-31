"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FriendSidebar } from "@/components/friend-sidebar";
import { UserSidebar } from "@/components/user-sidebar";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarContent className="gap-0">
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  <p className="text-lg font-semibold">Friends</p>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="mt-4">
                    <SidebarMenuItem>
                      <FriendSidebar href={"/chat/123"} />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Separator />
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  <p className="text-lg font-semibold">Add friends</p>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="mt-4">
                    <SidebarMenuItem>
                      <div className="flex items-center gap-4">
                        <Input />
                        <SearchIcon className="size-6" />
                      </div>
                    </SidebarMenuItem>
                  </SidebarMenu>

                  <SidebarMenu className="mt-2">
                    <SidebarMenuItem>
                      <UserSidebar />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Separator />

          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  <p className="text-lg font-semibold">Requests</p>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="mt-4">
                    <SidebarMenuItem>
                      <div className="flex items-center gap-4">
                        <Input />
                        <SearchIcon className="size-6" />
                      </div>
                    </SidebarMenuItem>
                  </SidebarMenu>

                  <SidebarMenu className="mt-2">
                    <SidebarMenuItem>
                      <UserSidebar />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
      </SidebarMenu>
    </SidebarGroup>
  );
}
