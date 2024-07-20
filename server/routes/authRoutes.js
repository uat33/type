const express = require("express");
const router = express.Router();

const {
    refreshToken,
    createToken,
    verifyToken,
    deleteToken,
    refreshUser,
} = require("../controllers/authController");

router.route("/token").get(createToken);
router.route("/token").patch(verifyToken, refreshToken);
router.route("/token").delete(deleteToken);
router.route("/user").get(refreshUser);

module.exports = router;
