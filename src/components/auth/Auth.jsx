// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const api = import.meta.env.VITE_APP_URL;
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({
        username: localStorage.getItem("username"),
        id: localStorage.getItem("id"),
    });
    const isLoggedIn = () => {
        if (!token) return false;
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    };

    const logout = () => {
        localStorage.clear();

        setToken(null);
        setUserInfo(null);
    };

    const refreshToken = async (user) => {
        try {
            // Example: Fetch new token from server
            const response = await axios.get(`${api}/auth/token`, {
                user,
            });
            const newToken = response.data.token;

            setToken(newToken);
            setUserInfo({
                username: user.username,
                id: user.id,
            });
            localStorage.setItem("token", newToken);
            localStorage.setItem("username", user.username);
            localStorage.setItem("id", user.id);
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
        }
    };

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token && isLoggedIn()) {
    //         setToken(token);
    //     } else {
    //         logout();
    //     }
    // }, []);

    return (
        <AuthContext.Provider
            value={{ token, isLoggedIn, logout, refreshToken, userInfo }}
        >
            {children}
        </AuthContext.Provider>
    );
};
