import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Typing from "./components/typing/Typing";
import Login from "./components/account/Login";
import History from "./components/History";
import CreateAccount from "./components/account/CreateAccount";
import { AuthProvider } from "./auth/Auth";
import { APIProvider } from "./Api";
import NotFound from "./components/NotFound";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Typing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/history" element={<History />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

function AppWithAuth() {
    return (
        <>
            <APIProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </APIProvider>
        </>
    );
}

export default AppWithAuth;
