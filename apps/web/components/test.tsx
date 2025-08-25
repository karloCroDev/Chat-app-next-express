"use client";

import { useLogout, useSession } from "@/app/hooks/auth";
import { Button } from "@/components/ui/button";
import { IRevalidateTag } from "@/lib/actions/utils";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { clientSession } from "@/lib/data/auth";
import * as React from "react";

export const Test = withReactQueryProvider(() => {
  const { data } = useSession();

  const { mutate } = useLogout();

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
