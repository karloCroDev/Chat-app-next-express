import Image from "next/image";
import Link, { LinkProps } from "next/link";

export const FriendSidebar: React.FC<LinkProps> = ({ ...rest }) => {
  return (
    <Link {...rest}>
      <div className="flex gap-3 items-center hover:opacity-50">
        {/* <Image src={} /> */}
        <div className="size-7 aspect-square rounded bg-blue-700 " />

        <div className="flex flex-col">
          <p>Karlo</p>
          <p className="text-xs text-muted-foreground">Lorem ipsum...</p>
        </div>
      </div>
    </Link>
  );
};
