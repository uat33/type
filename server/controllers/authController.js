const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

/**
 * Refresh the token to last another hour.
 */
const refreshToken = asyncHandler(async (req, res) => {
    const { username, id } = req.query;
    const token = jwt.sign(
        { userId: id, username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(201).json({ token });
});

/**
 * Verify token using jwt.verify when a protected route is accessed.
 */
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Authorization token is not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = decoded;
        next(); // next middleware
    });
};

module.exports = { refreshToken, verifyToken };
