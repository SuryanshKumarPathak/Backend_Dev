const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile("ExpressJS/Expresslog.txt", log, () => {
        res.setHeader("Content-Type", "text/plain");

        switch (myUrl.pathname) {
            case "/":
                if (req.method === "GET") {
                    res.end("Home Page");
                }
                break;

            case "/about":
                if (req.method === "GET") {
                    const username = myUrl.query.myname || "Guest";
                    res.end(`Hi, ${username}`);
                }
                break;

            case "/search":
                if (req.method === "GET") {
                    const search = myUrl.query.search_query;
                    res.end("Here are your results for " + search);
                }
                break;

            case "/signup":
                if (req.method === "GET") {
                    res.end("This is a signup form");
                } else if (req.method === "POST") {
                    res.end("User Registered Successfully");
                }
                break;

            case "/user":
                if (req.method === "PUT") {
                    // Full update of user
                    res.end("User details updated completely (PUT)");
                }

                else if (req.method === "PATCH") {
                    // Partial update
                    res.end("User details updated partially (PATCH)");
                }

                else if (req.method === "DELETE") {
                    // Delete user
                    res.end("User deleted successfully (DELETE)");
                }
                break;

            default:
                res.statusCode = 404;
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => console.log("Server Started on port 8000"));
