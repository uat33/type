const express = require("express");
const router = express.Router();

const { getToken, refreshToken } = require("../controllers/authController");

router.route("/token").get(getToken);
router.route("/refresh-token").get(refreshToken);

module.exports = router;
