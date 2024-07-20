const express = require("express");
const router = express.Router();

const resultController = require("../controllers/resultController");
const { verifyToken } = require("../controllers/authController");

router.route("/").post(resultController.createNewResult);
router.get("/:id", verifyToken, resultController.getResultsByUser);
module.exports = router;
