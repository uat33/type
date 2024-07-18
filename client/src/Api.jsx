import axios from "axios";
const url = import.meta.env.VITE_APP_URL;

import React, { createContext, useContext } from "react";
import { useAuth } from "./auth/Auth";
import { jwtDecode } from "jwt-decode";

const APIContext = createContext();

export const useAPI = () => useContext(APIContext);

export const APIProvider = ({ children }) => {
    // const { refreshToken, userInfo } = useAuth();
    const api = axios.create({
        baseURL: `${url}/api`,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    api.interceptors.request.use(
        async function (config) {
            // Retrieve context values
            const token = localStorage.getItem("token");
            if (token) {
                // Decode token to check expiration
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                // Check if token is expired or about to expire within 5 minutes
                if (decodedToken.exp - currentTime <= 300) {
                    // Token is about to expire or expired, refresh token
                    refreshToken(userInfo);
                    // Get the new token from local storage
                    // Update authorization header with new token
                    config.headers.Authorization = `Bearer ${newToken}`;
                } else {
                    // Token is still valid, set Authorization header
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }

            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    return (
        <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>
    );
};
