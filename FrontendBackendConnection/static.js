const express = require('express');
const app = express();
//Serve file from the public directory
//Absolute path : D:\Bridgelabz\Backend_Dev\Frontend
//Relative path : ./public

//const staticPath = path.join(__dirname,'public');
//const fullPath = path.join(staticPath,'index.html');
//console.log("full path",fullPath);



app.use(express.static('public'));
app.listen(8000, () => console.log("Server Started"));