import "reflect-metadata";
import express from "express";
import cors from "cors";

import errorHandler from "./middleware/errorHandler";

import paymentRoutes from "./routes/paymentRoutes";
import poke from "./routes/poke";
import subscriptionRoutes from "./routes/subscriptionRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/poke", poke);

app.use(errorHandler);

export default app;
