const http = require("http");
let user={
    username:"Rahul",
}

const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        "content-type":"application-json"
    })
    res.end(JSON.stringify(user))
})

server.listen(8000, () => console.log("Server Started"));