import React, { useState } from "react";
import AccountTemplate from "./AccountTemplate";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../Api";
import { useAuth } from "../../auth/Auth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(null);
    const [errorText, setErrorText] = useState("");
    const navigate = useNavigate();
    const { refreshToken } = useAuth();
    const { api } = useAPI();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/login", {
                username,
                password,
            });
            refreshToken(response.data.user);
            setValid(true);
            navigate("/");
        } catch (error) {
            console.log(error);
            setValid(false);
            setErrorText(error.response.data.message);
        }
    };

    return (
        <>
            <Navbar />
            <AccountTemplate
                invalidText="Invalid Login"
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
