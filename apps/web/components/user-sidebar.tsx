import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import { IoCheckmarkCircle } from "react-icons/io5";

export const UserSidebar = ({ ...rest }) => {
  return (
    <div className="flex gap-3 items-center ">
      {/* <Image src={} /> */}
      <div className="size-7 aspect-square rounded bg-blue-700 " />

      <div className="flex flex-col">
        <p>Karlo</p>
        <p className="text-xs text-muted-foreground">Lorem ipsum ...</p>
      </div>

      <div className="ml-auto flex gap-2">
        <Button size="sm">
          <IoCheckmarkCircle />
        </Button>
        <Button variant="outline" size="sm">
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};
