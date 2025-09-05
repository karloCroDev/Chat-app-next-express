"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export const PaymentPlans: React.FC<
  React.ComponentPropsWithoutRef<"div"> & {
    price: number;
    type?: "Monthly" | "Yearly";
    features: string[];
    isCurrentPlan?: boolean;
  }
> = ({ price, type, features, isCurrentPlan = false, className, ...rest }) => {
  console.log(!!price);
  return (
    <div
      {...rest}
      className={twMerge(
        "w-60 h-fit rounded border border-muted-foreground p-4 flex flex-col gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <p>{price === 0 ? "Free" : type} plan</p>
        <h4 className="text-xl font-semibold">{price}$</h4>
      </div>
      <Separator />
      <ul className="flex flex-col gap-4">
        {features.map((feature, i) => (
          <li key={i} className="list-disc ml-4">
            {feature}
          </li>
        ))}
      </ul>
      {!isCurrentPlan && <Button>Change plan</Button>}
    </div>
  );
};
