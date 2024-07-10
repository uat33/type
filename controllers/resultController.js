const Result = require("../models/Result");
const asyncHandler = require("express-async-handler");

const getAllResults = asyncHandler(async (req, res) => {
	const results = await Result.find().lean();
	if (!results?.length) {
		return res.status(400).json({ message: "No results found" });
	}

	res.json(users);
});

const createNewResult = asyncHandler(async (req, res) => {
	const { wpm, accuracy, completedWords, user } = req.body;

	if (!wpm || !user || !accuracy || !completedWords) {
		return res.status(400).json({ message: "All fields required." });
	}

	const result = Result.create({ wpm, accuracy, completedWords, user });

	if (result) {
		res.status(201).json({ message: `New post created.` });
	} else {
		res.status(400).json({ message: `Invalid user data` });
	}
});

// const updatePost = asyncHandler(async (req, res) => {
// 	const { id, title, content } = req.body;
// 	if (!id || !username || !password) {
// 		return res.status(400).json({ message: `All fields required` });
// 	}
// 	const post = await Result.findById(id).exec();
// 	if (!post) {
// 		return res.status(400).json({ message: `Post not found` });
// 	}

// 	post.title = title;
// 	post.text = content;

// 	const updatedPost = post.save();

// 	res.json({ message: `Post updated` });
// });

const deleteResult = asyncHandler(async (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.status(400).json({ message: `All fields required` });
	}
	const entry = await Result.findById(id).exec();
	if (!entry) {
		return res.status(400).json({ message: `Entry not found` });
	}

	const result = await user.deleteOne();

	res.json({ message: "Post deleted." });
});

module.exports = {
	getAllResults,
	createNewResult,
	// updatePost,
	deleteResult,
};
