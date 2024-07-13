import React from "react";
import Navbar from "./Navbar";
function History() {
    const stats = [
        {
            wpm: 65,
            accuracy: 92,
            completed: 150,
            time: 120,
            date: "2023-06-12T12:30:00Z",
        },
        {
            wpm: 70,
            accuracy: 95,
            completed: 180,
            time: 110,
            date: "2023-06-15T14:15:00Z",
        },
        {
            wpm: 60,
            accuracy: 90,
            completed: 140,
            time: 130,
            date: "2023-06-18T10:00:00Z",
        },
        // Add more entries as needed
    ];
    const headerClasses =
        "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-center";

    const rowClass = "text-center whitespace-nowrap py-4";
    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">History</h2>
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
                            {stats.map((stat, index) => (
                                <tr key={index} className="">
                                    <td className={rowClass}>{stat.wpm}</td>
                                    <td className={rowClass}>
                                        {stat.accuracy}%
                                    </td>
                                    <td className={rowClass}>
                                        {stat.completed}
                                    </td>
                                    <td className={rowClass}>{stat.time}</td>
                                    <td className={rowClass}>
                                        {new Date(stat.date).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default History;
