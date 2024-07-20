const Result = require("../models/Result");
const User = require("../models/User");

const asyncHandler = require("express-async-handler");

/**
 * Use id to find the results for a specific user
 */
const getResultsByUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID required" });
    }
    try {
        // Query posts where user field matches the userId
        const results = await Result.find({ user: id }).populate("user");
        // Return JSON response
        res.status(200).json(results);
    } catch (error) {
        console.log("Error fetching results:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * Verify data and create a new result.
 */
const createNewResult = asyncHandler(async (req, res) => {
    const { completedWords, totalCorrect, totalTotal, user, time } = req.body;

    // some of these can be 0 so check that they are undefined and not just falsy
    if (
        completedWords === undefined ||
        !user ||
        totalCorrect === undefined ||
        totalTotal === undefined ||
        !time
    ) {
        return res.status(400).json({ message: "All fields required." });
    }
    const userDoc = await User.findById(user.id);

    if (!userDoc) {
        return res.status(500).json({ message: "User not found." });
    }

    // calculate wpm and accuracy
    const wpm = (60 / time) * completedWords;
    const accuracy =
        totalTotal === 0 ? 0 : ((totalCorrect / totalTotal) * 100).toFixed(1);
    const result = Result.create({
        wpm,
        accuracy,
        completedWords,
        user: userDoc,
        time,
    });

    if (result) {
        res.status(201).json({ message: `New result created.` });
    } else {
        res.status(400).json({ message: `Invalid user data` });
    }
});

module.exports = {
    createNewResult,
    getResultsByUser,
};
