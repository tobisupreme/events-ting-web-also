"use client";

import { handleLogout } from "@/app/actions/logout";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-800 shadow-md relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            {/* You can replace this with an actual Image component for your logo */}
            <h1 className="text-3xl font-bold text-theme-primary">
              Events Ting
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <form action={handleLogout}>
              <button className="bg-theme-primary text-white px-4 py-2 rounded-md hover:bg-theme-primary_dark">
                Logout
              </button>
            </form>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-primary_focus"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <form action={handleLogout}>
            <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-white bg-theme-primary hover:bg-theme-primary_dark">
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
