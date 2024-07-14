const Result = require("../models/Result");
const User = require("../models/User");

const asyncHandler = require("express-async-handler");

const getResultsByUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
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

const getAllResults = asyncHandler(async (req, res) => {
    const results = await Result.find().lean();
    if (!results?.length) {
        return res.status(400).json({ message: "No results found" });
    }

    res.json(results);
});

const createNewResult = asyncHandler(async (req, res) => {
    const { completedWords, totalCorrect, totalTotal, user, time } = req.body;

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

const deleteResult = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: `All fields required` });
    }
    const entry = await Result.findById(id).exec();
    if (!entry) {
        return res.status(400).json({ message: `Entry not found` });
    }

    const result = await User.deleteOne();

    res.json({ message: "Post deleted." });
});

module.exports = {
    getAllResults,
    createNewResult,
    // updatePost,
    deleteResult,
    getResultsByUser,
};
