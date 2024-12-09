"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image"; // Importing Image from next/image
import chaiGIF from "../public/tea.gif"; // Importing the GIF from public folder

const NavbarSignIn = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const { data: session } = useSession(); // Get session info

  // Function to close the dropdown
  const closeDropdown = () => setIsDropdownOpen(false);

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

            {/* User Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-300 hover:text-white focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                {/* Display User Name if session exists */}
                {session ? (
                  <span className="text-white">{session.user?.name}</span>
                ) : (
                  <span className="text-white">Guest</span>
                )}
                {/* Dropdown indicator (down arrow) */}
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-[#000000] rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <div className="py-1" role="none">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-[#081228]"
                      role="menuitem"
                      onClick={closeDropdown} // Close dropdown on click
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={`/${session.user?.name}`} // Correct Profile link
                      className="block px-4 py-2 text-sm hover:bg-[#081228]"
                      role="menuitem"
                      onClick={closeDropdown} // Close dropdown on click
                    >
                      Profile
                    </Link>

                    {/* Separator */}
                    <hr className="my-1 border-t border-gray-600" />

                    {session ? (
                      <button
                        onClick={() => {
                          signOut();
                          closeDropdown(); // Close dropdown after sign-out
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-[#081228]"
                        role="menuitem"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm hover:bg-[#081228]"
                        role="menuitem"
                        onClick={closeDropdown} // Close dropdown on click
                      >
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
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
              <Link href="/info" className="block hover:text-blue-400">
                Information
              </Link>
            </li>
            <li>
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false); // Close mobile menu on sign out
                  }}
                  className="block w-full text-left hover:text-blue-400"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)} // Close mobile menu on click
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarSignIn;
