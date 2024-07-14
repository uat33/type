// LoginForm.js

import React, { useState } from "react";
import AccountTemplate from "./AccountTemplate";
import Navbar from "../Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";

const api = import.meta.env.VITE_APP_URL;

function Login() {
    // State to hold form values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(null);
    const [errorText, setErrorText] = useState("");
    const navigate = useNavigate();
    const { refreshToken } = useAuth();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${api}/users/login`, {
                username,
                password,
            });
            refreshToken(response.data.user);
            setValid(true);
            navigate("/");
        } catch (error) {
            setValid(false);
            setErrorText(error.response.data.message);
        }
    };

    return (
        <>
            <Navbar />
            <AccountTemplate
                invalidText="invalid login"
                name="Login"
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                valid={valid}
                errorText={errorText}
            />
        </>
    );
}

export default Login;
