import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/Auth";
import Dropdown from "./Dropdown";

const Navbar = () => {
    const { isLoggedIn, userInfo } = useAuth();
    return (
        <nav className="bg-gray-800 p-4 fixed w-full z-10 top-0 left-0">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Left side of the navbar */}
                <div className="flex items-center">
                    <Link to="/">
                        <span className="text-white text-lg">Typing Test</span>
                    </Link>
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

                    {!isLoggedIn() ? (
                        <Link to="/login">
                            <button className="bg-gray-900 text-white rounded-md py-2 px-4 mr-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Login
                            </button>
                        </Link>
                    ) : (
                        <>
                            <Dropdown username={userInfo?.username} />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
