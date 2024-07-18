import React from "react";
import InputTemplate from "./Input";
import { Link } from "react-router-dom";

function AccountTemplate(props) {
    // State to hold form values
    const separated = props.errorText.split("\n");
    return (
        <>
            <div className="flex items-center justify-center py-12 px-4 bg-stone-700 sm:px-6 lg:px-8 max-w-2xl mx-auto p-4 rounded shadow-lg">
                <div className="max-w-md w-full space-y-8">
                    {props.valid === false ? (
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
                            {props.name}
                        </h2>
                    </div>
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={props.handleSubmit}
                    >
                        <div className="rounded-md shadow-sm -space-y-px">
                            <InputTemplate
                                name="username"
                                value={props.username}
                                setValue={props.setUsername}
                                placeholder="Username"
                                type="text"
                            />
                            <InputTemplate
                                name="password"
                                value={props.password}
                                setValue={props.setPassword}
                                placeholder="Password"
                                type="password"
                            />
                            {props.name === "Create Account" ? (
                                <InputTemplate
                                    name="confirm password"
                                    value={props.confirmPassword}
                                    setValue={props.setConfirmPassword}
                                    placeholder="Confirm Password"
                                    type="password"
                                />
                            ) : (
                                <></>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {props.name}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {props.name === "Login" ? (
                <>
                    <p>Don't have an account?</p>
                    <Link to="/create-account">
                        <button>Create Account</button>
                    </Link>
                </>
            ) : (
                <>
                    <p>Already have an account?</p>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </>
            )}
        </>
    );
}

export default AccountTemplate;
