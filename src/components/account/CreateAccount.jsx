// LoginForm.js

import { useState } from "react";
import AccountTemplate from "./AccountTemplate";
import axios from "axios";

const url = import.meta.env.VITE_APP_URL;

function CreateAccount() {
    // State to hold form values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(null);
    const [errorText, setErrorText] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url}/users`, {
                username,
                password,
            });

            setValid(true);
        } catch (error) {
            console.log(error.response.data.message);
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
    );
}

export default CreateAccount;
