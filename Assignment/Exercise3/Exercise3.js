const os = require("os");
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "system-log.txt");

function logSystemInfo() {
  const cpuInfo = os.cpus().length;
  const totalMemory = (os.totalmem() / (1024 * 1024)).toFixed(2); // MB
  const freeMemory = (os.freemem() / (1024 * 1024)).toFixed(2);  // MB
  const platform = os.platform();
  const uptime = (os.uptime() / 60).toFixed(2); // minutes

  const log = `
Time: ${new Date().toLocaleString()}
Platform: ${platform}
CPU Cores: ${cpuInfo}
Total Memory: ${totalMemory} MB
Free Memory: ${freeMemory} MB
Uptime: ${uptime} minutes

`;

  fs.appendFile(logFile, log, (err) => {
    if (err) console.error("Error writing log:", err);
  });
}


setInterval(logSystemInfo, 5000);
console.log("System monitoring started... Logs will be written every 5 seconds.");
