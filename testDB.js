import connectToDatabase from "./db/connectDB.js";

(async () => {
  try {
    await connectToDatabase();
    console.log("MongoDB connection successful.");
    process.exit(0);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
})();
