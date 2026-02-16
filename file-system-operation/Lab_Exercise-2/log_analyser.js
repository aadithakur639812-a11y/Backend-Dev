import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "app.log");

// Counters
let totalLines = 0;
let infoCount = 0;
let errorCount = 0;
let warningCount = 0;

// Create read stream
const fileStream = fs.createReadStream(filePath);

// Handle file error properly
fileStream.on("error", (err) => {
  console.log("File error:", err.message);
});

// Create readline interface
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

// Read file line by line
rl.on("line", (line) => {
  totalLines++;

  if (line.includes("ERROR")) {
    errorCount++;
  } else if (line.includes("WARNING")) {
    warningCount++;
  } else if (line.includes("INFO")) {
    infoCount++;
  }
});

// When reading is complete
rl.on("close", () => {
  console.log("\n Log File Summary Report");
  console.log("---------------------------");
  console.log("Total log entries:", totalLines);
  console.log("INFO count:", infoCount);
  console.log("WARNING count:", warningCount);
  console.log("ERROR count:", errorCount);
});