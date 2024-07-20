import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";

const url = import.meta.env.VITE_APP_URL;

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState(null);
    // when a refreshes or re-enters page before token has expired
    useEffect(() => {
        if (!token) return;
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime && !userInfo) {
            setUserInfo({
                id: decodedToken.userId,
                username: decodedToken.username,
            });
        }
    }, []);

    const isLoggedIn = () => {
        if (!token) return false;
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp <= currentTime) {
            // logout();
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
        if (!userInfo || user.id !== userInfo.id) {
            setUserInfo({
                ...user,
            });
        }
        try {
            //  Fetch new token from server
            const response = await axios.get(`${url}/api/auth/refresh-token`, {
                params: user,
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
