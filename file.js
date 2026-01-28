const fs = require("fs");

const read = (err, data)=>{
    if(err){
        throw err;
    }
    console.log(data);
}

const data = fs.readFile("./index.js","utf-8",read);


