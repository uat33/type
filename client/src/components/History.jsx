import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { useAPI } from "../Api";
import { useAuth } from "../auth/Auth";

// get and display past results if the user is logged in
function History() {
    const { api } = useAPI();

    const { isLoggedIn, userInfo, logout } = useAuth();
    const [data, setData] = useState([]);

    // get the user's past results
    useEffect(() => {
        async function getData() {
            try {
                await api.get(`/results/${userInfo.id}`).then((res) => {
                    setData(res.data.reverse());
                });
            } catch (error) {
                return;
            }
        }
        getData();
    }, [userInfo]);
    const headerClasses =
        "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center";

    const rowClass = "text-center whitespace-nowrap py-4";
    return (
        <>
            <Navbar />

            {!isLoggedIn() ? (
                <h1>Log in to see past results</h1>
            ) : (
                <div className="max-w-2xl mx-auto p-4 rounded shadow-lg">
                    <h2 className="text-4xl font-bold mb-4 mt-8">
                        Previous Results
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="">
                                <tr>
                                    <th className={headerClasses}>WPM</th>
                                    <th className={headerClasses}>Accuracy</th>
                                    <th className={headerClasses}>
                                        Completed Words
                                    </th>
                                    <th className={headerClasses}>
                                        Time (seconds)
                                    </th>
                                    <th className={headerClasses}>Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.map((stat, index) => (
                                    <tr key={index} className="">
                                        <td className={rowClass}>{stat.wpm}</td>
                                        <td className={rowClass}>
                                            {stat.accuracy}%
                                        </td>
                                        <td className={rowClass}>
                                            {stat.completedWords}
                                        </td>
                                        <td className={rowClass}>
                                            {stat.time}
                                        </td>
                                        <td className={rowClass}>
                                            {new Date(
                                                stat.createdAt
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default History;
