// src/routes/stripeWebhook.ts

import express from "express";
import { stripe } from "../config/stripe";
import { buffer } from "micro";

const router = express.Router();

router.post("/webhook", async (req, res) => {
  const rawBody = await buffer(req);
  const signature = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(`Webhook signature verification failed.`);
    return res.sendStatus(400);
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      const subscriptionCreated = event.data.object;
      // Handle subscription created
      break;
    case "customer.subscription.updated":
      const subscriptionUpdated = event.data.object;
      // Handle subscription update
      break;
    case "customer.subscription.deleted":
      const subscriptionDeleted = event.data.object;
      // Handle subscription cancellation
      break;
    case "invoice.payment_succeeded":
      const paymentSucceeded = event.data.object;
      // Handle successful payment
      break;
    case "invoice.payment_failed":
      const paymentFailed = event.data.object;
      // Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router;
