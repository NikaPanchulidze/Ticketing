import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2025-04-30.basil"
});