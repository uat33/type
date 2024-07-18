import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useAuth } from "../auth/Auth";

const Navbar = () => {
    const { isLoggedIn } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    // add a border at the bottom of the navbar upon scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`bg-custom p-4 fixed w-full z-10 top-0 left-0 ${
                isScrolled ? "border-b-2 border-gray-200" : ""
            }`}
        >
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Left side of the navbar */}
                <div className="flex items-center">
                    <Link to="/">
                        <span className="text-4xl text-blue-600">
                            Typing Test
                        </span>
                    </Link>
                </div>

                {/* Right side of the navbar */}
                <div className="flex items-center">
                    {/* Home button */}

                    <Link to="/">
                        <button className="bg-blue-600 text-white rounded-md py-2 px-4 mr-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                            Home
                        </button>
                    </Link>

                    {/* Previous results button */}
                    <Link to="/history">
                        <button className="bg-blue-600 text-white rounded-md py-2 px-4 mr-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                            Previous Results
                        </button>
                    </Link>

                    {!isLoggedIn() ? (
                        <Link to="/login">
                            <button className="bg-blue-600 text-white rounded-md py-2 px-4 mr-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Login
                            </button>
                        </Link>
                    ) : (
                        <>
                            <Dropdown />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
