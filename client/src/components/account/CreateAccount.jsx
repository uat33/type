import React, { useState } from "react";
import AccountTemplate from "./AccountTemplate";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useAPI } from "../../Api";
import { useAuth } from "../../auth/Auth";

function CreateAccount() {
    const { api } = useAPI();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [valid, setValid] = useState(null);
    const [errorText, setErrorText] = useState("");
    const navigate = useNavigate();
    const { refreshToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users", {
                username,
                password,
                confirmPassword,
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

                    if (error.response.data.message === "Weak Password") {
                        setErrorText(error.response.data.missingText);
                    }
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
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
            />
        </>
    );
}

export default CreateAccount;
