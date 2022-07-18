import Order from "../models/Order.js";
import User from "../models/User.js";

import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

const handleWebhook = async (req, res) => {
  const payload = req["rawBody"];

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.WEB_HOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      // update order status
      const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
      order.status = "paid - awaiting shipment";
      await order.save();

      // clear users cart
      await User.findOneAndUpdate({ _id: order.user }, { shoppingCart: [] });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

export { handleWebhook };
