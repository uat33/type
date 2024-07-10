const express = require("express");
const router = express.Router();

const getData = require("../controllers/dataController");

router.route("/").get(getData);
module.exports = router;
