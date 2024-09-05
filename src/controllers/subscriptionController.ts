// src/controllers/subscriptionController.ts

import { Request, Response } from "express";
import * as subscriptionService from "../services/subscriptionService";

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, planId } = req.body;
    const subscription = await subscriptionService.createSubscription(
      userId,
      planId
    );
    res.status(201).json(subscription);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: JSON.stringify(error) });
    }
  }
};

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const { subscriptionId } = req.params;
    const canceledSubscription = await subscriptionService.cancelSubscription(
      subscriptionId
    );
    res.status(200).json({
      message: "Subscription cancelled successfully",
      subscription: canceledSubscription,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: JSON.stringify(error) });
    }
  }
};

export const getSubscription = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const subscription = await subscriptionService.getSubscription(userId);
    res.status(200).json(subscription);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: JSON.stringify(error) });
    }
  }
};
