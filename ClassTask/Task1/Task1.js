const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0];

function handleError(err) {
  if (err.code === "ENOENT") {
    console.error("Error: File or directory not found");
  } else if (err.code === "EACCES") {
    console.error("Error: Permission denied");
  } else {
    console.error("Error:", err.message);
  }
}

//Read a file
if (command === "read") {
  const filePath = args[1];

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return handleError(err);
    console.log("File Content:\n", data);
  });
}

//Write content to a file
else if (command === "write") {
  const filePath = args[1];
  const content = args.slice(2).join(" ");

  fs.writeFile(filePath, content, (err) => {
    if (err) return handleError(err);
    console.log("File written successfully");
  });
}

//Append logs to a file
else if (command === "append") {
  const filePath = args[1];
  const content = args.slice(2).join(" ");

  fs.appendFile(filePath, content + "\n", (err) => {
    if (err) return handleError(err);
    console.log("Content appended successfully");
  });
}

//Copy a file
else if (command === "copy") {
  const source = args[1];
  const destination = args[2];

  fs.copyFile(source, destination, (err) => {
    if (err) return handleError(err);
    console.log("File copied successfully");
  });
}

//Delete a file
else if (command === "delete") {
  const filePath = args[1];

  fs.unlink(filePath, (err) => {
    if (err) return handleError(err);
    console.log("File deleted successfully");
  });
}

//List files inside a directory
else if (command === "list") {
  const dirPath = args[1];

  fs.readdir(dirPath, (err, files) => {
    if (err) return handleError(err);
    console.log("📁 Files in directory:");
    files.forEach(file => console.log("-", file));
  });
}

//Invalid command
else {
  console.log(`
Invalid Command

Available Commands:
node fileManager.js read <file>
node fileManager.js write <file> <content>
node fileManager.js append <file> <content>
node fileManager.js copy <source> <destination>
node fileManager.js delete <file>
node fileManager.js list <directory>
`);
}
