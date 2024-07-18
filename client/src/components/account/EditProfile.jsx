import React, { useState } from "react";
import Navbar from "../Navbar";
import AccountTemplate from "./AccountTemplate";
import InputTemplate from "./Input";

function EditProfile() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [valid, setValid] = useState(null);
    const [errorText, setErrorText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    const separated = errorText.split("\n");

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center py-12 px-4 bg-stone-700 sm:px-6 lg:px-8 max-w-2xl mx-auto p-4 rounded shadow-lg">
                <div className="max-w-md w-full space-y-8">
                    {valid === false ? (
                        <>
                            <div className="bg-red-700 rounded-md">
                                {separated.map((e, i) => (
                                    <div key={i}>{e}</div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Edit Profile
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <InputTemplate
                                    name="Current Password"
                                    valueconfirmsetPassword={username}
                                    setValue={setUsername}
                                    placeholder="Current Password"
                                    type="text"
                                />
                            </div>
                            <div className="mb-4">
                                <InputTemplate
                                    name="username"
                                    value={username}
                                    setValue={setUsername}
                                    placeholder="Username"
                                    type="text"
                                />
                            </div>
                            <div className="mb-4">
                                <InputTemplate
                                    name="password"
                                    value={password}
                                    setValue={setPassword}
                                    placeholder="Password"
                                    type="password"
                                />
                            </div>
                            <div className="mb-4">
                                <InputTemplate
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    setValue={setConfirmPassword}
                                    placeholder="Enter Password Again"
                                    type="password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditProfile;
