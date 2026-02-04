// const http = require("http");
const express = require("express");
const app = express();
app.get("/", (req, res) => {
    return res.send("Home Page");
});

app.get("/about", (req, res) => {
    const username = req.query.name;
    const age = req.query.age;
    return res.send(`Hi, ${username}!  You are ${age} years old.`);
});

app.get("/student", (req, res) => {
    const sname = req.query.sname;
    const marks = req.query.marks;
    if (marks > 40) {
        return res.send(`Hi, ${sname}!  You are passed.`);
    }
    else {
        return res.send(`Sorry ${sname}, you have not passed.`);
    }
});
app.get("/attendance",(req,res)=>{
    const sname= req.query.name.split(",");
    const attendance= req.query.attendance.split(",");
    const arr = [];
    for (let i=0;i<attendance.length;i++){
        if(attendance[i]=="present"){
        arr[i]= (`${sname[i]} is present<br>`);
    }
    else{
        arr[i]= (`${sname[i]} is absent<br>`);
    }
    }
    return res.send(arr.join(''));
})



// const myServer = http.createServer(app);
app.listen(8000, () => console.log("Server Started"));