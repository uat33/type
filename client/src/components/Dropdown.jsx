import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/Auth";

function Dropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { logout, userInfo } = useAuth();
    // const navigate = useNavigate();
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
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={toggleDropdown}
                >
                    {userInfo?.username?.charAt(0)}
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg py-1">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={logout}
                        >
                            Logout
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

export default Dropdown;
