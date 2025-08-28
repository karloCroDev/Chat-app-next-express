"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams, usePathname } from "next/navigation";

export const BreadcrumbMapping = () => {
  const pathname = usePathname();

  const pathnameWithoutSearchParams = pathname.split("?")[0];

  const splittedPathname = pathnameWithoutSearchParams
    ?.split("/")
    .filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {splittedPathname?.map((path, index) => {
          const href = "/" + splittedPathname.slice(0, index + 1).join("/");
          return (
            <div key={path} className="flex items-center gap-4">
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  nextLinkProps={{
                    href,
                  }}
                >
                  {path[0]?.toUpperCase() + path.slice(1).toLowerCase()}
                </BreadcrumbLink>
              </BreadcrumbItem>

              {splittedPathname.length - 1 !== index && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </div>
          );
        }, "")}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
