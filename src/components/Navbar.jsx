import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2NJihKViDNt2hRestOr0yK1IOfVrOIa2_Q&s"
                alt="logo"
              />
            </Link>
            <h1 className="text-2xl font-bold ml-2">AgriPredict</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                About Us
              </Link>
              <Link
                to="/news"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                News
              </Link>
              <Link
                to="/filter-data"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                Filter Data
              </Link>
              <Link
                to="/analysis"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                Analysis
              </Link>
              <Link
                to="/price-prediction"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                Price Prediction
              </Link>
              <Link
                to="/market-trends"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                Market Trends
              </Link>
              <Link
                to="/state-prices"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition duration-300"
              >
                State Prices
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/news"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition duration-300"
            >
              News
            </Link>
            <Link
              to="/filter-data"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition duration-300"
            >
              Filter Data
            </Link>
            <Link
              to="/historical-data"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition duration-300"
            >
              Historical Data
            </Link>
            <Link
              to="/price-prediction"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition duration-300"
            >
              Price Prediction
            </Link>
            <Link
              to="/market-trends"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition duration-300"
            >
              Market Trends
            </Link>
            <Link
              to="/state-prices"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-600 transition duration-300"
            >
              State Prices
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
