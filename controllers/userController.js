const User = require("../models/User");
const Result = require("../models/Result");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const numSaltRounds = 10;

// @desc get all users
// @route get /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password").lean();
	if (!users?.length) {
		return res.status(400).json({ message: "No users found" });
	}

	res.json(users);
});

// @desc update a users
// @route patch /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "All fields required" });
	}

	const duplicate = await User.findOne({ username }).lean().exec();
	if (duplicate) {
		return res.status(409).json({ message: "Username taken" });
	}

	// hash pw
	const hashed = await bcrypt.hash(password, numSaltRounds); // 10 salt rounds

	// create object
	const userObject = { username, password: hashed };

	const user = await User.create(userObject);

	if (user) {
		res.status(201).json({ message: `New user ${username} created.` });
	} else {
		res.status(400).json({ message: `Invalid user data` });
	}
});

const updateUser = asyncHandler(async (req, res) => {
	const { id, username, password } = req.body;
	if (!id || !username || !password) {
		return res.status(400).json({ message: `All fields required` });
	}
	const user = await User.findById(id).exec();
	if (!user) {
		return res.status(400).json({ message: `User not found` });
	}

	const duplicate = await User.findOne({ username }).lean().exec();

	if (duplicate && duplicate?._id.toString() !== id) {
		return res.status(409).json({ message: "duplicate username" });
	}

	user.username = username;

	if (password) {
		user.password = await bcrypt.hash(password, numSaltRounds);
	}

	const updatedUser = await user.save();

	res.json({ message: `${updatedUser.username} updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ message: `Id required` });
	}

	const posts = await Result.find({ user: "id" }).lean().exec();

	const user = await User.findById(id).exec();

	if (!user) {
		return res.status(400).json({ message: `user not found` });
	}

	const result = await user.deleteOne();
	console.log(result);

	const reply = `Username ${user.username} deleted.`;
	res.json(reply);
});

module.exports = {
	getAllUsers,
	createNewUser,
	deleteUser,
	updateUser,
};
