import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/db/connectDB"; // Import the MongoDB connection function
import mongoose from "mongoose";

// Define the auth options
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`, // Make sure the redirect URI is correct
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`, // Make sure the redirect URI is correct
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Connect to MongoDB
        await connectToDatabase(); // Ensure we're connected to MongoDB

        const email = user?.email;
        if (!email) {
          console.error("Error in signIn callback: Email is undefined.");
          return false;
        }

        // Use the "getmeachai" collection explicitly
        const db = mongoose.connection.db;
        const collection = db.collection("getmeachai");

        const existingUser = await collection.findOne({ email: email });

        if (existingUser) {
          // Update existing user
          await collection.updateOne(
            { email: email },
            {
              $set: {
                name: profile.name || existingUser.name,
                profilepic: profile.picture || existingUser.profilepic,
              },
            }
          );
          console.log("User updated:", email);
        } else {
          // Create a new user if it doesn't exist
          const username = email.split("@")[0]; // Generate a default username from the email

          const result = await collection.insertOne({
            name: profile.name || username,
            email: email,
            username: username,
            profilepic: profile.picture || "", // Use profile.picture if available
          });
          console.log("New user created:", result);
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Reject sign-in in case of an error
      }
    },
  },
};

const handler = NextAuth(authOptions);

// Export NextAuth handlers for GET and POST (important for App Router)
export { handler as GET, handler as POST };
