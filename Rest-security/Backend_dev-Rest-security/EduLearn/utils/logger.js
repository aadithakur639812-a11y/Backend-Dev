import fs from "fs";
import path from "path";

const logFilePath = path.join("logs", "app.log");

// ensure logs folder exists
if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

// basic logger function
export function logger(message) {
    const log = `[${new Date().toISOString()}] ${message}\n`;

    // print in console
    console.log(log);

    // save in file
    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            console.error("Logging error:", err);
        }
    });
}