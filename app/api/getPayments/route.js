import connectToDatabase from "@/db/connectDB.js";
import Payment from "@/app/models/Payment.model";

export async function GET(request) {
  try {
    await connectToDatabase(); // Ensure the database is connected

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    let username = searchParams.get("username");

    // Decode username if it's URL-encoded
    if (username) {
      username = decodeURIComponent(username);
    }

    // Filter payments by username if provided
    const query = username ? { to_username: username } : {};

    // Fetch payments using the Mongoose model
    const payments = await Payment.find(query).lean(); // `lean()` for plain JavaScript objects

    return new Response(JSON.stringify(payments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch payments" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
