const User = require("../models/User");
const Result = require("../models/Result");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const Filter = require("bad-words");
const filter = new Filter();
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
schema.is().min(8).has().uppercase().has().lowercase().has().digits();
const numSaltRounds = 10;

const weakPasswordMap = {
    min: "Password must be 8 characters.",
    lowercase: "Password must have at least 1 lowercase character.",
    uppercase: "Password must have at least 1 uppercase character.",
    digits: "Password must have at least 1 number.",
};

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "All fields required" });
    }
    try {
        const user = await User.findOne({ username }).lean().exec();
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare passwords asynchronously
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error comparing the passwords." });
            }

            if (!result) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const returnValue = { username: user.username, id: user._id };

            // Passwords match, return success response
            return res
                .status(201)
                .json({ message: "Logged in", user: returnValue });
        });
    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

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

    try {
        // check that a username isn't profane
        if (filter.isProfane(username)) {
            return res.status(400).json({ message: "Inappropriate username." });
        }
        // check that the username hasn't been taken
        const duplicate = await User.findOne({ username }).lean().exec();
        if (duplicate) {
            return res.status(409).json({ message: "Username taken" });
        }

        // check if the password is strong enough
        // return an appropriate message
        if (!schema.validate(password)) {
            const missing = schema.validate(password, { list: true });
            const missingText = missing
                .map((m) => weakPasswordMap[m])
                .join("\n");
            return res
                .status(400)
                .json({ message: "Weak Password", missingText });
        }
        // save user
        const hashed = await bcrypt.hash(password, numSaltRounds);

        const userObject = { username, password: hashed };

        const user = await User.create(userObject);

        const returnValue = { username: user.username, id: user._id };
        if (user) {
            return res
                .status(201)
                .json({ message: "User created.", user: returnValue });
        }
        return res.status(400).json({ message: `Invalid user data` });
    } catch (error) {
        console.log("Error creating user:", error);
        return res.status(500).json({ message: "Server error" });
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

    const reply = `Username ${user.username} deleted.`;
    res.json(reply);
});

module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    loginUser,
};
