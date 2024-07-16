// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
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
        if (decodedToken.exp <= currentTime) {
            localStorage.clear();
        }
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
            const response = await api.get("/auth/refresh-token", {
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
    console.log(token);

    // TODO: this doesn't work at all
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem("token");
            console.log("oldtoken", token);
            setToken(token ? token : null);
            console.log("newtoken", token);
        };
        handleStorageChange();
        // Listen for changes to 'myData' in local storage
        // window.addEventListener("storage", handleStorageChange);

        // // Clean up the event listener when component unmounts
        // return () => {
        //     window.removeEventListener("storage", handleStorageChange);
        // };
    }, [localStorage.getItem("token")]);

    return (
        <AuthContext.Provider
            value={{ token, isLoggedIn, logout, refreshToken, userInfo }}
        >
            {children}
        </AuthContext.Provider>
    );
};
