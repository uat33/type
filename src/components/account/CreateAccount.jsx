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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${url}/users`, {
            username,
            password,
        });
        if (response) {
            console.log("Submitted!");
        }
    };

    return (
        <AccountTemplate
            invalidText="invalid login"
            name="Create Account"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            valid={valid}
        />
    );
}

export default CreateAccount;
