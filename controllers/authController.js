const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const getToken = asyncHandler(async (req, res) => {
    const user = req.body;
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(201).json({ token });
});

const refreshToken = asyncHandler(async (req, res) => {
    const user = req.body;
    const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "30s" } // Token expires in 1 hour
    );

    return res.status(201).json({ token });
});

module.exports = { getToken, refreshToken };
