import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import User from "@/models/user";

export async function POST(req) {
  try {
    // 1. Verify the webhook event is from Stripe

    const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET);

    const body = await req.text();

    const signature = headers().get("stripe-signature");

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const { data, type } = event;

    await connectMongo();

    if (type === "checkout.session.completed") {
      // Grant access to the product
      const user = await User.findById(data.object.client_reference_id);

      user.hasAccess = true;
      user.customerId = data.object.customer;

      await user.save();
    } else if (type === "customer.subscription.deleted") {
      // Revoke access to the product (subscription cancelled or non-payed)
      const user = await User.findOne({
        customerId: data.object.customer,
      });

      user.hasAccess = false;

      await user.save();
    }
  } catch (error) {
    // return NextResponse.json({ error: error.message }, { status: 500 });
    console.error("Stripe error: " + error?.message);
  }

  return NextResponse.json({});
}
