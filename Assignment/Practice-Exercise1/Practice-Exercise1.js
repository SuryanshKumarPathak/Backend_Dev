const fs = require("fs").promises;
const path = require("path");
async function readJsonFile(filePath) {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const jsonObject = JSON.parse(fileData);

    console.log("Parsed JavaScript Object:");
    console.log(jsonObject);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("File not found");
    } else if (error instanceof SyntaxError) {
      console.error("Invalid JSON format");
    } else {
      console.error("Error:", error.message);
    }
  }
}
const filePath = path.join(__dirname, "data.json");
readJsonFile(filePath);