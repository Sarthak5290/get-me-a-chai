"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Username = () => {
  const { data: session } = useSession(); // Fetch authenticated user session
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("Anonymous");
  const [paymentMakerName, setPaymentMakerName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [supporters, setSupporters] = useState([]);
  const [isLoadingSupporters, setIsLoadingSupporters] = useState(true);

  // Fetch user data by email
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(
          `/api/getUser?email=${session.user.email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        setUserData(data); // Set entire user data
        setUsername(data.name || "Anonymous");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [session]);

  // Fetch supporters
  useEffect(() => {
    const fetchSupporters = async () => {
      setIsLoadingSupporters(true);
      try {
        const response = await fetch(`/api/getPayments?username=${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch supporters");
        }

        const data = await response.json();
        setSupporters(data);
      } catch (error) {
        console.error("Error fetching supporters:", error);
      } finally {
        setIsLoadingSupporters(false);
      }
    };

    if (username) {
      fetchSupporters();
    }
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const response = await fetch("/api/initiatePayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          to_username: username,
          name_of_payment_maker: paymentMakerName,
          message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate payment.");
      }

      const { orderId, keyId, razorpayAmount, currency } = data;

      const options = {
        key: keyId,
        amount: razorpayAmount,
        currency,
        name: paymentMakerName,
        description: "Donation Payment",
        image: "/your-logo.png", // Replace with your logo
        order_id: orderId,
        prefill: {
          name: username || "Anonymous",
          email: session?.user?.email || "example@example.com",
        },
        theme: { color: "#3399cc" },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/verifyPayment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyResponse.json();
            if (verifyResponse.ok) {
              alert("Payment successful!");
            } else {
              throw new Error(verifyData.error || "Verification failed.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => console.log("Payment popup closed."),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleAmountClick = (value) => setAmount(value);

  return (
    <div className="min-h-screen bg-[#081228] flex flex-col items-center">
      {/* Cover Image */}
      <div className="w-full relative h-64 sm:h-70 md:h-70 lg:h-[70vh] overflow-hidden">
        <Image
          src={userData?.coverpic || "https://via.placeholder.com/800x400"}
          alt="Cover Image"
          fill
          className="object-cover object-center"
          priority={true}
        />
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40 flex justify-center">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full border-4 border-white shadow-lg overflow-hidden">
          <Image
            src={userData?.profilepic || "https://via.placeholder.com/150"}
            alt="Profile Picture"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-8 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          @{username}
        </h1>
        <p className="mt-2 text-gray-300 text-lg md:text-xl max-w-md mx-auto">
          Let us help <span className="font-semibold">{username}</span> get a
          cup of tea!
        </p>
      </div>

      {/* Supporters and Payment Sections */}
      <div className="flex flex-wrap justify-between mt-8 px-6 w-full max-w-screen-lg mx-auto">
        {/* Supporters Section */}
        <div className="w-full sm:w-1/2 lg:w-1/2 mb-8">
          <div className="py-8 px-6 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Supporters</h2>
            {isLoadingSupporters ? (
              <p className="text-gray-400 mt-4">Loading supporters...</p>
            ) : supporters.length > 0 ? (
              <ul className="mt-4 space-y-2 text-gray-300">
                {supporters.map((supporter, index) => (
                  <li key={index}>
                    {supporter.name_of_payment_maker} donated ₹
                    {supporter.amount} with a message:{" "}
                    {supporter.message || "No message provided"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-400">No supporters yet.</p>
            )}
          </div>
        </div>

        {/* Payment Section */}
        <div className="w-full sm:w-1/2 lg:w-1/2 mb-8">
          <div className="py-8 px-6 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Make a Payment</h2>
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Payment Maker's Name"
                value={paymentMakerName}
                onChange={(e) => setPaymentMakerName(e.target.value)}
                className="w-full p-2 bg-[#081228] text-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 mt-4 bg-[#081228] text-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 mt-4 bg-[#081228] text-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                min="0"
                step="1"
              />
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Make Payment
              </button>
              <div className="mt-4 flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleAmountClick(10)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Pay ₹10
                </button>
                <button
                  type="button"
                  onClick={() => handleAmountClick(20)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Pay ₹20
                </button>
                <button
                  type="button"
                  onClick={() => handleAmountClick(50)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Pay ₹50
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Username;
