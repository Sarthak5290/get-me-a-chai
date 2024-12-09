"use server";

import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "@/app/models/Payment.model";
import connectToDatabase from "@/db/connectDB";


export const initiatePayment = async ({
  amount,
  to_username,
  name_of_payment_maker,
  message,
}) => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Validate inputs
    if (!amount || amount <= 0) throw new Error("Invalid amount");
    if (!to_username) throw new Error("Invalid recipient");
    if (!name_of_payment_maker) throw new Error("Invalid payment maker");

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { to_username },
    };

    const order = await razorpay.orders.create(options);

    // Check if order ID already exists in the database
    const existingPayment = await Payment.findOne({
      razorpay_order_id: order.id,
    });
    if (existingPayment) {
      throw new Error("Payment with this order ID already exists.");
    }

    // Create new payment record
    const payment = new Payment({
      name_of_payment_maker,
      amount,
      currency: "INR",
      message,
      razorpay_order_id: order.id,
      to_username,
      status: "pending",
      payment_attempt: 1,
    });

    // Save the payment record to MongoDB
    await payment.save();

    return {
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
    };
  } catch (error) {
    console.error("Payment initiation error:", error.message);
    throw new Error("Payment initiation failed");
  }
};

// Verify Payment function
export const verifyPayment = async (paymentDetails) => {
  try {
    console.log("Verifying payment details:", paymentDetails);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentDetails;

    // Ensure all required details are provided
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error("Missing payment details for verification.");
    }

    // Generate signature for verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Signature mismatch. Payment verification failed.");
      throw new Error("Invalid payment signature.");
    }

    console.log("Signature validation successful.");

    // Update payment status in the database
    const payment = await Payment.findOneAndUpdate(
      { razorpay_order_id },
      {
        $set: {
          razorpay_payment_id,
          razorpay_signature,
          status: "success",
        },
        $inc: { payment_attempt: 1 },
      },
      { new: true }
    );

    if (!payment) {
      throw new Error("Payment record not found.");
    }

    console.log("Payment record updated successfully:", payment);
    return payment;
  } catch (error) {
    console.error("Error during payment verification:", error.message);
    throw new Error("Payment verification failed. Please contact support.");
  }
};
