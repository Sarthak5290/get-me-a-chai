"use client";

import React, { useState } from "react";

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // Call backend API to create order
      const response = await fetch("/api/initiatePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 500, // INR 500
          to_username: "Gaurav Kumar", // Replace with dynamic user data
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate payment");
      }

      const { orderId, keyId, amount, currency } = data;

      // Open Razorpay modal
      const options = {
        key: keyId,
        amount,
        currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          try {
            // Verify payment on the server
            const verifyResponse = await fetch("/api/verifyPayment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyResponse.ok) {
              // Payment was successful, now add the payment data to the database
              const paymentData = {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                signature: razorpay_signature,
                amount: amount, // The amount paid
                currency: currency,
                to_username: "Gaurav Kumar", // Replace with dynamic user data
              };

              const saveResponse = await fetch("/api/savePaymentData", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentData),
              });

              if (saveResponse.ok) {
                alert("Payment successful and data saved!");
              } else {
                throw new Error("Failed to save payment data");
              }
            } else {
              throw new Error(verifyData.error || "Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error.message || error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error.message || error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-6 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
