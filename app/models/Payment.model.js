import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    name_of_payment_maker: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    message: { type: String, default: "" },
    razorpay_order_id: { 
      type: String, 
      sparse: true // Allows multiple null values
    },
    razorpay_payment_id: { type: String, default: null },
    razorpay_signature: { type: String, default: null },
    to_username: { type: String, required: true },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  },
  { 
    timestamps: true,
    optimisticConcurrency: true // Prevent duplicate order IDs
  }
);

// Pre-save hook to sanitize the `to_username` field
PaymentSchema.pre("save", function (next) {
  // Decode URI-encoded characters like %20 to spaces
  this.to_username = decodeURIComponent(this.to_username);

  // Remove spaces and special characters, replacing them with an underscore
  this.to_username = this.to_username.replace(/[\s%•.\u00A0]/g, " ");

  next();
});

// Ensure mongoose creates the model only once
export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
