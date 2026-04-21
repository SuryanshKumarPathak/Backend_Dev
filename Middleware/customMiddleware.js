// // Custom middleware
// const { Router } = require("express");



// // 1 logger middleware: Check the request method 
// // Real use: debugging, monitoring, logging requests for analytics, etc.

// const logger = (req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   next();
// };


// //2 validation Middleware: Validate incoming data for a specific route
// // Real use: Ensure data integrity, prevent invalid data from being processed, Form validation, API data check 

// const validateUserData = (req, res, next) => {
//   const { name, email } = req.body;
//     if (!name || !email) {
//     return res.status(400).json({ error: "Name and email are required" });
//     }
//     next();
// };


// //3 Route-specific middleware: Apply middleware to specific routes for targeted functionality
// // Real use: Authentication, Authorization, Rate limiting, Protected Route, Admin Panel etc. 

// const router = Router();
// router.post("/users", validateUserData, (req, res) => {
//   // Handle user creation logic here
//   res.status(201).json({ message: "User created successfully" });
// });


// // Synatax:
// if(user!= "admin") {
//     return res.status(403).json({ error: "Forbidden" });
// };

// // Cycle : LVR Rule
// // Logger -> Validation -> Route-Specific Middleware -> Route Handler


const express = require("express");
const app  = express()

//Built-in Middleware
app.use(express.json());


//Logger Middleware
const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - Request Method: ${req.method}, URL: ${req.url}`);
    next();
};
//Apply Globally
app.use(logger);

//validation middleware

const validate=(req,res,next)=>{
    // Add validation logic here
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    next();
};

//route specific middleware
const checkAdmin=(req,res,next)=>{
    //dummy check for admin role (real me DB/jwt token check hoga)
    const isAdmin=true;
    if(!isAdmin){
        return res.status(403).json({error:"Access denied, Admins only"});
    }
    next();
};












//homeroute
app.get("/",( req, res) => {    
    res.send("Welcome to the Home Page");
});


//validation route middleware
app.post("/user",validate,(req,res)=>{
    res.json({message:"User created successfully", data:req.body});
});
//route specific middleware admin check
app.get("/admin",checkAdmin,(req,res)=>{
    res.send("Welcome Admin");
});

app.listen(8000,()=>{
    console.log("Server is running on port 8000");  
});


module.exports = [logger, validate, checkAdmin];