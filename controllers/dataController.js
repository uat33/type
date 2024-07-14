const https = require("https");
const asyncHandler = require("express-async-handler");
const URL = "https://random-word-api.vercel.app/api?words=10";
const getData = asyncHandler(async (req, res) => {
	// Replace 'URL' with the actual HTTPS URL you want to fetch data from

	// Make a GET request to the HTTPS endpoint
	https
		.get(URL, (resp) => {
			let data = "";

			// A chunk of data has been received
			resp.on("data", (chunk) => {
				data += chunk;
			});

			// The whole response has been received
			resp.on("end", () => {
				// Parse the received data as JSON
				const responseData = JSON.parse(data);

				// Send the parsed data as JSON response to the client
				res.json(responseData);
			});
		})
		.on("error", (err) => {
			console.log("Error: " + err.message);
			res.status(500).json({ error: "Failed to fetch data" });
		});
});

module.exports = getData;
