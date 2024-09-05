import express from "express";
import * as paymentController from "../controllers/paymentController";

const router = express.Router();

router.post(
  "payments/create-payment-intent",
  paymentController.createPaymentIntent
);

router.post(
  "payments/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);

export default router;
