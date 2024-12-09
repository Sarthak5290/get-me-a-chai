import mongoose from "mongoose";

// MongoDB connection utility
const connectToDatabase = async () => {
  // Check if the connection already exists (for serverless environments)
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("Failed to connect to database");
  }
};

export default connectToDatabase;
