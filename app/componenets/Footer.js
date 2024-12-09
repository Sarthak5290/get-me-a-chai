import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 w-full fixed bottom-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">
            Copyright © 2024 Get Me A Chai | All rights reserved!
          </p>
          <p className="text-sm text-gray-400 mb-4">Made by Sarthak Gaikwad</p>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-8 text-sm text-gray-400 mb-4">
            <Link href="/about" className="hover:text-blue-400 transition duration-200">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition duration-200">
              Contact Us
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/in/sarthak-gaikwad-848288529029082003"
              className="text-gray-400 hover:text-blue-400"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Sarthak5290"
              className="text-gray-400 hover:text-blue-400"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
