// LoginForm.js

import { useState } from "react";
import AccountTemplate from "./AccountTemplate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useAuth } from "../auth/Auth";

const api = import.meta.env.VITE_APP_URL;

function CreateAccount() {
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
            const response = await axios.post(`${api}/users`, {
                username,
                password,
            });
            refreshToken(response.data.user);
            setValid(true);
            navigate("/");
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    setValid(false);
                    setErrorText(error.response.data.message);
                } else if (error.response.status === 400) {
                    setValid(false);
                    setErrorText(error.response.data.message);
                }
            } else {
                setError("Failed to create user. Please try again later.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <AccountTemplate
                name="Create Account"
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

export default CreateAccount;
