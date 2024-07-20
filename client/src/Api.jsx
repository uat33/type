import axios from "axios";
// server url
const url = import.meta.env.VITE_APP_URL;

import React, { createContext, useContext } from "react";

const APIContext = createContext();

export const useAPI = () => useContext(APIContext);

export const APIProvider = ({ children }) => {
    const api = axios.create({
        baseURL: `${url}/api`,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    return (
        <APIContext.Provider value={{ api }}>{children}</APIContext.Provider>
    );
};
