export interface CreatePaymentIntentDto {
  amount: number;
  currency: string;
  paymentMethodType: string;
}

export interface PaymentIntent {
  clientSecret: string;
}
