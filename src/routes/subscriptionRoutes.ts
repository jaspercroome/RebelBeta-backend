// src/routes/subscriptionRoutes.ts

import express, { Request, Response } from "express";
import { authenticateUser } from "../middleware/auth";
import * as subscriptionController from "../controllers/subscriptionController";
import { body, param } from "express-validator";
import { validate } from "../middleware/requestValidator";
import { validateDto } from "../middleware/dtoValidation";
import {
  CancelSubscriptionDto,
  CreateSubscriptionDto,
  GetSubscriptionDto,
} from "../types/subscription";

const router = express.Router();

// Create a new subscription
router.post(
  "/",
  authenticateUser,
  validateDto(CreateSubscriptionDto),
  subscriptionController.createSubscription
);

// Retrieve subscription status
router.get(
  "/:userId",
  authenticateUser,
  validateDto(CancelSubscriptionDto),
  subscriptionController.getSubscription
);

// Cancel subscription
router.delete(
  "/:subscriptionId",
  authenticateUser,
  validateDto(GetSubscriptionDto),
  subscriptionController.cancelSubscription
);

export default router;
