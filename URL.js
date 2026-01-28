const url = require("url")
const http = require("http")

const server = http.createServer((req,res)=>{
    const myUrl= url.parse(req.url,true);
    console.log(myUrl);
    switch (myUrl.pathname) {
    case "/":
        res.end("This is home page");
      break;

    case "/about":
        const username = myUrl.query.myname;
        console.log(username)
        res.end(`Hi , ${username}`);  
      break;

    default:
        res.end("404 page not found")

  }

})


server.listen(8002,()=>console.log("Server Started"))