"use client";
import React from "react";
import Link from "next/link"; // Importing Link from next/link
import Image from "next/image"; // Importing Image from next/image
import chaiGIF from "../public/tea.gif"; // Importing the GIF from public folder

const Body = () => {
  return (
    <>
      <div className="pt-24 relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-900 via-slate-950 to-black text-white px-6 sm:px-12">
        {/* Hero Section */}
        <div className="text-center mt-12 sm:mt-16 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 mr-4">
            Buy Me a Chai!
          </h1>
          {/* use chai gif here with next/image */}
          <Image
            className="pb-8"
            src={chaiGIF}
            alt="Chai GIF"
            width={60} // Adjust the width according to the font size
            height={50} // Keep it square to match the text height
          />
        </div>

        <p className="text-sm sm:text-base max-w-3xl mx-auto leading-relaxed text-gray-400">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start your journey now and bring your ideas to life!
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="/login"
            className="px-6 py-2 text-sm sm:text-base font-semibold bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-lg"
            aria-label="Start your journey now"
          >
            Start Now
          </Link>
          <Link
            href="/info"
            className="px-6 py-2 text-sm sm:text-base font-semibold bg-gray-700 hover:bg-gray-800 transition rounded-lg shadow-lg"
            aria-label="Learn more about the platform"
          >
            Read More
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 opacity-50"></div>
        </div>
      </div>
    </>
  );
};

export default Body;
