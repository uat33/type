const express = require("express");
const router = express.Router();

const resultController = require("../controllers/resultController");
const { verifyToken } = require("../controllers/authController");

router
    .route("/")
    .get(resultController.getAllResults)
    .post(resultController.createNewResult)
    .delete(resultController.deleteResult);
router.get("/:id", verifyToken, resultController.getResultsByUser);
module.exports = router;
