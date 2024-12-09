import React from "react";
import Footer from "../componenets/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 shadow-md mb-40 rounded-lg max-w-3xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-200 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-400 mb-6">
          We would love to hear from you!
        </p>
        <p className="text-md text-gray-300 mb-4">
          If you have any questions, feedback, or need support, feel free to
          reach out to us:
        </p>
        <p className="text-md font-medium text-gray-200 mb-6">
          Email:{" "}
          <a
            href="mailto:interntech123@gmail.com"
            className="text-blue-400 hover:underline"
          >
            interntech123@gmail.com
          </a>
        </p>
        <p className="text-md text-gray-300 mb-4">
          Follow us on social media for the latest updates and news:
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            Twitter
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-400"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Contact;
