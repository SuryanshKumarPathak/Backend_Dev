const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {

  let responseText = "";
  let statusCode = 200;

  switch (req.url) {
    case "/":
      responseText = "This is Home page";
      break;

    case "/about":
      responseText = "This is About page";
      break;

    case "/contact":
      responseText = "This is Contact page";
      break;

    default:
      responseText = "404 Page Not Found";
      statusCode = 404;
  }
  res.writeHead(statusCode, { "Content-Type": "text/plain" , });
  res.end(responseText);
  const log = `${new Date().toISOString()} | ${req.url} | ${responseText}\n`;

  fs.appendFile("NodeJs/log.txt", log, (err) => {
    if (err) console.error(err);
  });
});

myServer.listen(8001, () => console.log("Server Started"));
