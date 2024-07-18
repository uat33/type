const express = require("express");
const router = express.Router();

const { refreshToken } = require("../controllers/authController");

router.route("/refresh-token").get(refreshToken);

module.exports = router;
