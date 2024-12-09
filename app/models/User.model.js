import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
    profilepic: { type: String, default: "" },
    coverpic: { type: String, default: "" },
    razorpayId: { type: String, default: "" },
    razorpaySecret: { type: String, default: "" },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.models.User || model("User", UserSchema);
