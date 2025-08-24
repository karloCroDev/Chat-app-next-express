"use client";

import { useSession } from "@/app/hooks/auth";
import { withReactQueryProvider } from "@/lib/config/react-query";
import { clientSession } from "@/lib/data/auth";
import * as React from "react";

export const Test = withReactQueryProvider(() => {
  const { data } = useSession();
  console.log(data);

  return <div>test</div>;
});
