import React, { useState } from "react";

const Dashboard = () => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        alert("User saved successfully!");
        console.log("Saved user:", data.data);
      } else {
        alert("Failed to save user: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving user.");
    }
  };

  return (
    <div className="container mx-auto py-20 px-6">
      <h1 className="text-center my-5 text-4xl font-extrabold text-gray-900 dark:text-white">
        Welcome to your Dashboard
      </h1>

      <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
        <div className="my-4">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-800 dark:text-white"
          >
            Name
          </label>
          <input
            value={form.name || ""}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300"
          />
        </div>

        {/* Email input */}
        <div className="my-4">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-800 dark:text-white"
          >
            Email
          </label>
          <input
            value={form.email || ""}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300"
          />
        </div>

        {/* Other inputs (username, profilepic, coverpic, razorpayid, razorpaysecret) */}
        {/* Repeat similar structure for each field */}
        {/* ... */}

        {/* Profile Picture input */}
        <div className="my-4">
          <label
            htmlFor="profilepic"
            className="block mb-2 text-lg font-medium text-gray-800 dark:text-white"
          >
            Profile Picture
          </label>
          <input
            value={form.profilepic || ""}
            onChange={handleChange}
            type="text"
            name="profilepic"
            id="profilepic"
            className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300"
          />
        </div>

        {/* Cover Picture input */}
        <div className="my-4">
          <label
            htmlFor="coverpic"
            className="block mb-2 text-lg font-medium text-gray-800 dark:text-white"
          >
            Cover Picture
          </label>
          <input
            value={form.coverpic || ""}
            onChange={handleChange}
            type="text"
            name="coverpic"
            id="coverpic"
            className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300"
          />
        </div>

        {/* Razorpay ID input */}
        <div className="my-4">
          <label
            htmlFor="razorpayid"
            className="block mb-2 text-lg font-medium text-gray-800 dark:text-white"
          >
            Razorpay Id
          </label>
          <input
            value={form.razorpayid || ""}
            onChange={handleChange}
            type="text"
            name="razorpayid"
            id="razorpayid"
            className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300"
          />
        </div>

        {/* Razorpay Secret input */}
        <div className="my-4">
          <label
            htmlFor="razorpaysecret"
            className="block mb-2 text-lg font-medium text-gray-800 dark:text-white"
          >
            Razorpay Secret
          </label>
          <input
            value={form.razorpaysecret || ""}
            onChange={handleChange}
            type="text"
            name="razorpaysecret"
            id="razorpaysecret"
            className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300"
          />
        </div>

        <div className="my-6">
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 font-medium text-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
