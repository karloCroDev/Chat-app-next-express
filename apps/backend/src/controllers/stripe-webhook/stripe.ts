import { prisma } from "@/src/config/prisma";
import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function stripeWebhook(req: Request, res: Response) {
  const userId = req.user!.userId;

  const sig = req.headers["stripe-signature"];
  if (!sig) {
    return res
      .status(400)
      .send({ success: false, message: "Missing signature" });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: `Webhook error: ${err instanceof Error ? err.message : "Unknown error"}`,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          { expand: ["line_items"] }
        );

        const customerId = session.customer as string;
        const customer = await stripe.customers.retrieve(customerId);
        // If I am going to make different payment plans
        // const priceId = session.line_items?.data[0]?.price?.id ?? null;

        if (!("email" in customer) || !customer.email) {
          throw new Error("Customer email missing");
        }

        await prisma.user.update({
          where: { id: userId },
          data: {
            customerId,
            subscriptionTier: "PREMIUM",
            subscriptionActive: "ACTIVE",
          },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.id
        );

        await prisma.user.update({
          where: { customerId: subscription.customer as string },
          data: { subscriptionTier: "BASIC", subscriptionActive: "INACTIVE" },
        });
        break;
      }

      case "invoice.payment_failed": {
        res.status(400).json({
          success: false,
          message: "Invoice payment failed",
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: `Stripe error: ${err instanceof Error ? err.message : "Unknown error"}`,
    });
  }

  return res.json({ received: true });
}
