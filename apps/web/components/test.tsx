"use client";

import { useLogout, useSession } from "@/app/hooks/auth";
import { Button } from "@/components/ui/button";
import { IRevalidateTag } from "@/lib/actions/utils";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { clientSession } from "@/lib/data/auth";
import * as React from "react";

export const Test = withReactQueryProvider(() => {
  const { data } = useSession();

  console.log("Client session:", data);
  const { mutate } = useLogout();

  React.useEffect(() => {
    const fetchExample = async () => {
      const res = await fetch("http://localhost:4000/protected", {
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
    };
    fetchExample();
  }, []);

  return (
    <Button
      onClick={() =>
        mutate(undefined, {
          onSuccess: () => {
            IRevalidateTag("session");
          },
        })
      }
    >
      Log out
    </Button>
  );
});
