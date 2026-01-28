const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  //   //  console.log("Request received");
  //   //   console.log(req.headers);
  //   // console.log(req);
  const log = `${Date.now()}: ${req.url} New Req received\n`;
  fs.appendFile("NodeJs/log.txt", log, (err, data) => {
    //  switch case
    
    switch (req.url) {
      case "/":
        res.end(" Home page");
        break;
      case "/about":
        res.end(" About page");
        break;
      case "/contact":
        res.end(" Contact page");
        break;
      default:
        res.end("404 page Not Found");
        break;
    }
    // res.end("Hello from my server Again!");
  });
  //   res.end("Hello from my server Again!");
});

myServer.listen(8000, () => console.log("Server Started"));