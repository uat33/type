import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Function to handle click outside the dropdown
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownOpen(false);
        }
    };

    // Effect to add click event listener when dropdown is open
    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-gray-800 p-4 fixed w-full z-10 top-0 left-0">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Left side of the navbar */}
                <div className="flex items-center">
                    <span className="text-white text-lg">My App</span>
                </div>

                {/* Right side of the navbar */}
                <div className="flex items-center">
                    {/* Home button */}

                    <Link to="/">
                        <button className="bg-gray-900 text-white rounded-md py-2 px-4 mr-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                            Home
                        </button>
                    </Link>

                    {/* Previous results button */}
                    <Link to="/history">
                        <button className="bg-gray-900 text-white rounded-md py-2 px-4 mr-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                            Previous Results
                        </button>
                    </Link>

                    {/* Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="bg-gray-900 text-white rounded-md py-2 px-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            onClick={toggleDropdown}
                        >
                            Menu
                        </button>
                        {/* Conditional rendering based on dropdown state */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg py-1">
                                {/* Example dropdown items */}
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Item 1
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Item 2
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Item 3
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
