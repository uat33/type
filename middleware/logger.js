const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

async function logEvents(message, fileName) {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  const logsTarget = path.join(__dirname, "..", "logs");
  try {
    if (!fs.existsSync(logsTarget)) {
      await fsPromises.mkdir(logsTarget);
    }

    await fsPromises.appendFile(path.join(logsTarget, fileName), logItem);
  } catch (err) {
    console.log(err);
  }
}

function logger(req, res, next) {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
}

module.exports = { logger, logEvents };
