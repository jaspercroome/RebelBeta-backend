import { IsUUID, IsString, IsNotEmpty } from "class-validator";
export interface StripeCustomer {
  id: string;
  email: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  status: string;
  current_period_end: string;
  created_at: string;
}

export class CreateSubscriptionDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  planId!: string;
}

export class CancelSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  subscriptionId!: string;
}

export class GetSubscriptionDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
