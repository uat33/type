// imports
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./routes/root");
const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");
const resultRoutes = require("./routes/resultRoutes");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const connect = require("./config/database");

const PORT = process.env.PORT || 3500;
const app = express();

connect();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static("public"));

app.use("/", routes);
app.use("/users", userRoutes);
app.use("/results", resultRoutes);
app.use("/data", dataRoutes);

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ message: "404 not found" });
	} else {
		res.type("txt").send("404 not found");
	}
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("CONNECTED");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("err", (err) => {
	console.log(err);
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
		"mongoErrLog.log"
	);
});
