// LoginForm.js

import { useState } from "react";
import AccountTemplate from "./AccountTemplate";
import Navbar from "../Navbar";

function Login() {
    // State to hold form values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(null);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted!", { username, password });
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
            />
        </>
    );
}

export default Login;
