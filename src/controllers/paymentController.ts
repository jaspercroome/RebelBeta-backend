import { Request, Response } from "express";
import Stripe from "stripe";

import * as paymentService from "../services/paymentService";
import asyncHandler from "../utils/asyncHandler";
import { stripe } from "../config/stripe";

export const createPaymentIntent = asyncHandler(
  async (req: Request, res: Response) => {
    const paymentIntent = await paymentService.createPaymentIntent(req.body);
    res.json(paymentIntent);
  }
);

export const handleWebhook = asyncHandler(
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      } else {
        res.status(400).send(`Webhook Error: ${err}`);
      }
      return;
    }

    await paymentService.handlePaymentWebhook(event);

    res.json({ received: true });
  }
);
