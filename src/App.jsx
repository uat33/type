import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Typing from "./components/Typing";
import Login from "./components/account/Login";
import History from "./components/History";
import CreateAccount from "./components/account/CreateAccount";
import { useAuth, AuthProvider } from "./components/auth/Auth";

function App() {
    const { isLoggedIn } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Typing />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/history"
                    element={
                        isLoggedIn() ? <History /> : <Navigate to="/login" />
                    }
                />
                {/* <ProtectedRoute path="/history" component={History} /> */}
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </Router>
    );
}

function AppWithAuth() {
    return (
        <>
            <AuthProvider>
                <App />
            </AuthProvider>
        </>
    );
}

export default AppWithAuth;
