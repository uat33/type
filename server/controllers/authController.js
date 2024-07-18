const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const refreshToken = asyncHandler(async (req, res) => {
    const { username, id } = req.query;
    const token = jwt.sign(
        { userId: id, username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(201).json({ token });
});

const verifyToken = (req, res, next) => {
    // 1. Extract the token from the request headers or query parameters or cookies
    const token = req.headers.authorization?.split(" ")[1];

    // 2. Verify the token
    if (!token) {
        return res
            .status(401)
            .json({ message: "Authorization token is not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // 3. If verification is successful, attach the decoded payload to the request object
        req.user = decoded;
        next(); // Pass control to the next middleware or route handler
    });
};

module.exports = { refreshToken, verifyToken };
