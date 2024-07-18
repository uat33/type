// AuthContext.js

import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const AuthContext = createContext();
const url = import.meta.env.VITE_APP_URL;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({});
    const isLoggedIn = () => {
        if (!token) return false;
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp <= currentTime) {
            localStorage.clear();
            return false;
        }
        return true;
    };

    const logout = () => {
        localStorage.clear();

        setToken(null);
        setUserInfo(null);
    };

    const refreshToken = async (user) => {
        setUserInfo({
            ...user,
        });
        try {
            // Example: Fetch new token from server
            const response = await axios.get(`${url}/api/auth/refresh-token`, {
                user,
            });
            const newToken = response.data.token;

            setToken(newToken);
            localStorage.setItem("token", newToken);
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
        }
    };

    return (
        <AuthContext.Provider
            value={{ token, isLoggedIn, logout, refreshToken, userInfo }}
        >
            {children}
        </AuthContext.Provider>
    );
};
