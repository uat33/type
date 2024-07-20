import React, { createContext, useContext, useState, useEffect } from "react";
import { useAPI } from "../Api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [expireTime, setExpireTime] = useState(null);
    const { api } = useAPI();

    useEffect(() => {
        if (userInfo) return;

        async function getUser() {
            try {
                const response = await api.get("/auth/user");
                const decodedToken = response.data.data;
                const currentTime = Date.now() / 1000;
                if (currentTime < decodedToken.exp) {
                    setUserInfo({
                        id: decodedToken.userId,
                        username: decodedToken.username,
                    });
                    setExpireTime(decodedToken.exp);
                    console.log(userInfo);
                }
            } catch (error) {
                console.log("Invalid token.");
            }
        }

        getUser();
    }, []);

    const isLoggedIn = () => {
        if (!expireTime) return false;
        return expireTime > Date.now() / 1000;
    };

    const logout = () => {
        async function deleteToken() {
            try {
                const response = await api.delete("/auth/token");
                setExpireTime(null);
                setUserInfo(null);
            } catch (error) {
                console.log("Failed to logout");
            }
        }
        deleteToken();
    };

    const createToken = async (user) => {
        setUserInfo({
            ...user,
        });
        try {
            //  Fetch new token from server
            const response = await api.get("/auth/token", {
                params: user,
                withCredentials: true,
            });
            if (response.status === 201) {
                setExpireTime(Date.now() / 1000 + 60 * 60);
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
    };

    const refreshToken = async (user) => {
        const currentTime = Date.now() / 1000;
        console.log("current time is ", currentTime);

        try {
            //  Fetch new token from server
            const response = await api.patch("/auth/token", {
                params: user,
                withCredentials: true,
            });
            if (response.status === 201) {
                setExpireTime(Date.now() / 1000 + 60 * 60);
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
        }
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, logout, refreshToken, userInfo, createToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};
