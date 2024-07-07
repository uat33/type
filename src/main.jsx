import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import History from "./components/History.jsx";
import Login from "./components/account/Login.jsx";
import CreateAccount from "./components/account/CreateAccount.jsx";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const testData = [
    {
        wpm: 65,
        accuracy: 92,
        completed: 10,
        time: 45,
        date: 1643253600000, // Assuming this is a Unix timestamp in milliseconds
    },
    {
        wpm: 72,
        accuracy: 87,
        completed: 12,
        time: 55,
        date: 1643167200000, // Another example timestamp
    },
    {
        wpm: 70,
        accuracy: 95,
        completed: 14,
        time: 50,
        date: 1643077200000, // Another example timestamp
    },
];

// Render the History component with testData
<History stats={testData} />;

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<App />} />
            <Route path="history" element={<History stats={testData} />} />
            <Route path="login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
