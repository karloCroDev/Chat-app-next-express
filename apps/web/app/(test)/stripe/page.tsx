import { PaymentPlans } from "@/components/payment-plans";
import { serverSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function StripePage() {
  const user = await serverSession();
  if (!user) redirect("/auth/login");

  console.log(user);
  return (
    <>
      <h1 className="mt-8 ml-4 text-2xl font-semibold">Select payment</h1>
      <div className="flex justify-between w-[1000px] p-4">
        <PaymentPlans
          features={["Lorem", "Lorem", "Lorem", "Ipsum"]}
          price={0}
          user={user}
          isCurrentPlan={
            user.subscriptionTier === "BASIC" &&
            user.subscriptionType === "NONE"
          }
        />
        <PaymentPlans
          user={user}
          features={["Lorem", "Lorem", "Lorem"]}
          price={4.99}
          type="Monthly"
          isCurrentPlan={
            user.subscriptionTier === "PREMIUM" &&
            user.subscriptionType === "MONTHLY"
          }
        />
        <PaymentPlans
          user={user}
          features={["Lorem", "Lorem", "Lorem"]}
          price={39.99}
          type="Yearly"
          isCurrentPlan={
            user.subscriptionTier === "PREMIUM" &&
            user.subscriptionType === "YEARLY"
          }
        />
      </div>
    </>
  );
}
