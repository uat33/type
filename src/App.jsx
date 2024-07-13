import CreateAccount from "./components/account/CreateAccount";
import Login from "./components/account/Login";
import Typing from "./components/Typing";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={<Typing />} />
                {/* <Route path="history" element={<History stats={testData} />} /> */}
                <Route path="login" element={<Login />} />
                <Route path="create-account" element={<CreateAccount />} />
            </Route>
        )
    );
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
