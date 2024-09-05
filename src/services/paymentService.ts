import Stripe from "stripe";

import { stripe } from "../config/stripe";
import supabase from "../config/supabase";
import { CreatePaymentIntentDto, PaymentIntent } from "../types/payment";
import { AppError } from "../middleware/errorHandler";

export const createPaymentIntent = async (
  data: CreatePaymentIntentDto
): Promise<PaymentIntent> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency,
      payment_method_types: [data.paymentMethodType],
    });

    return { clientSecret: paymentIntent.client_secret as string };
  } catch (error) {
    throw new AppError("Failed to create payment intent", 500);
  }
};

export const handlePaymentWebhook = async (event: Stripe.Event) => {
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // Update Supabase with payment information
    const { error } = await supabase.from("payments").insert({
      stripe_payment_id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: "succeeded",
      // Add other relevant fields
    });

    if (error) {
      throw new AppError("Failed to update payment record", 500);
    }
  }
};
