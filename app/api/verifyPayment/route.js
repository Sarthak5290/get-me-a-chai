import { verifyPayment } from "@/app/actions/useractions.js";

export async function POST(request) {
  try {
    const paymentDetails = await request.json();

    const verifiedPayment = await verifyPayment(paymentDetails);

    return new Response(JSON.stringify(verifiedPayment), { status: 200 });
  } catch (error) {
    console.error("Error in /api/verifyPayment:", error.message || error);
    return new Response(JSON.stringify({ error: error.message || "Server error" }), { status: 500 });
  }
}
