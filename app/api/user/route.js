import dbConnect from "@/db/connectDB";
import User from "@/app/models/User.model";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json(); // Parse the JSON body
    const { name, email, username, profilepic, coverpic, razorpayid, razorpaysecret } = body;

    // Find a user by email and update if exists, otherwise create a new one
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Search query
      {
        name,
        username,
        profilepic,
        coverpic,
        razorpayId: razorpayid,
        razorpaySecret: razorpaysecret,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true } // Options: update or insert
    );

    return new Response(JSON.stringify({ success: true, data: updatedUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
