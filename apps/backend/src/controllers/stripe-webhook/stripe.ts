// import { prisma } from "@/src/config/prisma";
// import { AcceptRequestArgs, acceptRequestSchema } from "@repo/schemas";
// import { Request, Response } from "express";
// import stripe from "stripe";
// import Stripe from "stripe";

// export async function stripeWebhook(req: Request, res: Response) {
//   const body = req.body;
//   const signature = req.headers["stripe-signature"];

//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
//   const user = req.user!.userId

//   let event: Stripe.Event;

//   // verify Stripe event is legit
//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature as string,
//       webhookSecret
//     );
//   } catch (error) {
//     return res.status(400).send({
//       success: false,
//       message: `Webhook error: ${error instanceof Error ? error.message : "Unknown error"}`,
//     });
//   }

//   const data = event.data;
//   const eventType = event.type;

//   try {
//     switch (eventType) {
//       case "checkout.session.completed": {
//         // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout) ==> Grant access to the product
//         let user;
//         const session = await stripe.customer.sessions.retrieve(data.object., {
//           expand: ["line_items"],
//         });
//         const customerId = session?.customer;
//         const customer = await stripe.customers.retrieve(customerId);
//         const priceId = session?.line_items?.data[0]?.price.id;

//         if (customer.email) {
//           user = await User.findOne({ email: customer.email });

//           if (!user) {
//             user = await User.create({
//               email: customer.email,
//               name: customer.name,
//               customerId,
//             });

//             await user.save();
//           }
//         } else {
//           console.error("No user found");
//           throw new Error("No user found");
//         }

//         // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
//         user.priceId = priceId;
//         user.hasAccess = true;
//         await user.save();

//         // Extra: >>>>> send email to dashboard <<<<

//         break;
//       }

//       case "customer.subscription.deleted": {
//         // ❌ Revoke access to the product
//         // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
//         const subscription = await stripe.subscriptions.retrieve(
//           data.object.id
//         );
//         const user = await prisma.user.update({
//           where: {
//             s
//           },
//         });

//         break;
//       }

//       case "invoice.payment_failed": {
//         break;
//       }
//       default:
//         console.log(`Unhandled event type ${eventType}`);
//       // Unhandled event type
//     }
//   } catch (error) {
//     throw new Error(
//       "stripe error:" +
//         (error instanceof Error ? error.message : "Unknown error") +
//         " | EVENT TYPE: " +
//         eventType
//     );
//   }
// }
