import express from "express";
import * as paymentController from "../controllers/paymentController";

const router = express.Router();

router.post("/create-payment-intent", paymentController.createPaymentIntent);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleWebhook
);

export default router;
