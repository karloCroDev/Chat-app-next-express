import * as React from "react";

import { cn } from "@/lib/utils/class-merger";

export type TextAreaProps = React.ComponentProps<"textarea">;
function Textarea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40   flex field-sizing-content w-full rounded-md  bg-transparent px-3 py-2 text-base outline-none min-h-16 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
