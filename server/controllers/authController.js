const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
function generateToken(username, id) {
    const token = jwt.sign(
        { userId: id, username },
        secretKey,
        { expiresIn: "1h" } // Token expires in 1 hour
    );
    return token;
}

const createToken = asyncHandler(async (req, res) => {
    const { username, id } = req.query;
    const token = generateToken(username, id);

    try {
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60,
        });
        return res.status(201).json({ message: "Created token" });
    } catch (error) {
        return res.status(400).json({ message: "Failed to create token." });
    }
});

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: "Token expired" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(403).json({ message: "Token verification failed" });
    }
});

const refreshToken = asyncHandler(async (req, res) => {
    const { userId, name } = req.user;
    const newToken = generateToken(name, userId);
    res.cookie("token", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60,
    });

    return res.status(201).json({ message: "Refreshed token" });
});

const deleteToken = asyncHandler(async (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({ message: "Deleted token" });
});

const refreshUser = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ message: "No token" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: "Token expired" });
        }

        return res
            .status(201)
            .json({ message: "Valid cookie and token", data: decoded });
    } catch (error) {
        return res.status(403).json({ message: "Error with token handling" });
    }
});

module.exports = {
    refreshToken,
    verifyToken,
    createToken,
    deleteToken,
    refreshUser,
};
