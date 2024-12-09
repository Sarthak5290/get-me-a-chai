"use client";
import React, { useState } from "react";
import Link from "next/link"; // Importing Link from next/link
import { useSession, signOut } from "next-auth/react";
import Image from "next/image"; // Importing Image from next/image
import chaiGIF from "../public/tea.gif"; // Importing the GIF from public folder
import NavbarSignIn from "../componenets/NavbarSignIn";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <NavbarSignIn />
      </>
    );
  }

  return (
    <nav className="bg-[#081228] text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold flex items-center">
            <Link href="/" className="text-white">
              GetMeAChai!
            </Link>
            {/* Display Chai GIF next to the Logo */}
            <Image
              src={chaiGIF}
              alt="Chai GIF"
              width={30} // Adjust the size of the GIF
              height={30} // Adjust the size of the GIF
              className="ml-2"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>

            <Link href="/info" className="hover:text-blue-400">
              Information
            </Link>
            <Link href="/login" className="hover:text-blue-400">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="px-4 pt-2 pb-3 space-y-2 bg-black">
            <li>
              <Link href="/" className="block hover:text-blue-400">
                Home
              </Link>
            </li>

            <li>
              <Link href="/projects" className="block hover:text-blue-400">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/signup" className="block hover:text-blue-400">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/login" className="block hover:text-blue-400">
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
