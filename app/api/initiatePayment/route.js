import { initiatePayment } from "@/app/actions/useractions.js";

export async function POST(request) {
  try {
    const { amount, to_username, name_of_payment_maker, message } = await request.json();

    if (!amount || !to_username || !name_of_payment_maker) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400 }
      );
    }

    const paymentDetails = await initiatePayment({
      amount,
      to_username,
      name_of_payment_maker,
      message,
    });

    return new Response(JSON.stringify(paymentDetails), { status: 200 });
  } catch (error) {
    console.error("Error in /api/initiatePayment:", error.message || error);
    return new Response(JSON.stringify({ error: error.message || "Server error" }), { status: 500 });
  }
}
