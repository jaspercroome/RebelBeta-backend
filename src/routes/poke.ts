import express from "express";
import asyncHandler from "../utils/asyncHandler";

const router = express.Router();

router.get(
  "/",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    res.json({ poke: "hello, friend" }).status(200);
  })
);

export default router;
