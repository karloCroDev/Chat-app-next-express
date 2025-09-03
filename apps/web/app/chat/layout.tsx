import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BreadcrumbMapping } from "@/components/breadcrumb-mapping";
import { serverSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { SocketContextProvider } from "@/hooks/context/SocketContext";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await serverSession();

  if (!user) redirect("/login");

  return (
    <SocketContextProvider>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbMapping />
            <div className="ml-auto">
              <ModeToggle />
            </div>
          </header>
          <main className="relative h-[calc(100%-64px)] w-full">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </SocketContextProvider>
  );
}
