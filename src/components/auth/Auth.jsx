// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const url = import.meta.env.VITE_APP_URL;
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({});
    const isLoggedIn = () => {
        if (!token) return false;
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const refreshToken = async (user) => {
        try {
            console.log(user);
            // Example: Fetch new token from server
            const response = await axios.get(`${url}/auth/token`, {
                user,
            });
            const newToken = response.data.token;
            setToken(newToken);
            setUserInfo({
                username: user.username,
                id: user.id,
            });
            console.log(userInfo);
            localStorage.setItem("token", newToken);
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && isLoggedIn()) {
            setToken(token);
        } else {
            logout();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ token, isLoggedIn, logout, refreshToken, userInfo }}
        >
            {children}
        </AuthContext.Provider>
    );
};
