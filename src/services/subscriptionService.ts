// src/services/subscriptionService.ts

import { stripe } from "../config/stripe";
import supabase from "../config/supabase";

export const createSubscription = async (userId: string, planId: string) => {
  // Get the user from your database
  const { data: user, error } = await supabase
    .from("users")
    .select("email, stripe_customer_id")
    .eq("id", userId)
    .single();

  if (error || !user) throw new Error("User not found");

  let stripeCustomerId = user.stripe_customer_id;

  // If the user doesn't have a Stripe customer ID, create one
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      metadata: { userId },
    });
    stripeCustomerId = customer.id;

    // Update the user with the new Stripe customer ID
    await supabase
      .from("users")
      .update({ stripe_customer_id: stripeCustomerId })
      .eq("id", userId);
  }

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ price: planId }],
  });

  // Store the subscription info in your database
  await supabase.from("subscriptions").insert({
    user_id: userId,
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    current_period_end: new Date(subscription.current_period_end * 1000),
  });

  return subscription;
};

export const cancelSubscription = async (subscriptionId: string) => {
  // Cancel the subscription in Stripe
  const canceledSubscription = await stripe.subscriptions.cancel(
    subscriptionId
  );

  // Update the subscription status in your database
  await supabase
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("stripe_subscription_id", subscriptionId);

  return canceledSubscription;
};

export const getSubscription = async (userId: string) => {
  // Get the subscription from your database
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error("Subscription not found");

  // If you need more details, you can fetch from Stripe
  const stripeSubscription = await stripe.subscriptions.retrieve(
    subscription.stripe_subscription_id
  );

  return { ...subscription, stripeDetails: stripeSubscription };
};
