const express = require("express");
const router = express.Router();

const resultController = require("../controllers/resultController");

router
	.route("/")
	.get(resultController.getAllResults)
	.post(resultController.createNewResult)
	// .patch(resultController.updatePost)
	.delete(resultController.deleteResult);

module.exports = router;
