"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@repo/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { twMerge } from "tailwind-merge";

// const manageSubscription = `https://billing.stripe.com/p/login/test_3cI7sMb8p0ma5dxbMt9ws00?prefilled_email=${user.email}`;

export const PaymentPlans: React.FC<
  React.ComponentPropsWithoutRef<"div"> & {
    price: number;
    type?: "Monthly" | "Yearly";
    features: string[];
    isCurrentPlan?: boolean;
    user: User;
  }
> = ({
  price,
  type,
  features,
  isCurrentPlan = false,
  user,
  className,
  ...rest
}) => {
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
      {!isCurrentPlan && (
        <Button>
          <Link
            target="_blank"
            href={
              // This is for test purposes only. Add urls for development!
              (type === "Monthly"
                ? "https://buy.stripe.com/test_3cI7sMb8p0ma5dxbMt9ws00"
                : "https://buy.stripe.com/test_cNi9AUekB7OCgWfbMt9ws01") +
              `?prefilled_email=${user.email}`
            }
          >
            Change plan
          </Link>
        </Button>
      )}
    </div>
  );
};
