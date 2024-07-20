const https = require("https");
const asyncHandler = require("express-async-handler");
const URL = process.env.API_URL;

/**
 * Get the 10 words that make up a line.
 */
const getData = asyncHandler(async (req, res) => {
    https
        .get(URL, (resp) => {
            let data = "";

            resp.on("data", (chunk) => {
                data += chunk;
            });

            resp.on("end", () => {
                const responseData = JSON.parse(data);

                res.json(responseData);
            });
        })
        .on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(500).json({ error: "Failed to fetch data" });
        });
});

module.exports = getData;
