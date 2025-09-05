import { PaymentPlans } from "@/components/payment-plans";

export default async function StripePage() {
  return (
    <>
      <h1 className="mt-8 ml-4 text-2xl font-semibold">Select payment</h1>
      <div className="flex justify-between w-[800px] p-4">
        <PaymentPlans
          features={["Lorem", "Lorem", "Lorem"]}
          price={0}
          isCurrentPlan
        />
        <PaymentPlans
          features={["Lorem", "Lorem", "Lorem"]}
          price={4.99}
          type="Monthly"
        />
        <PaymentPlans
          features={["Lorem", "Lorem", "Lorem"]}
          price={39.99}
          type="Yearly"
        />
      </div>
    </>
  );
}
