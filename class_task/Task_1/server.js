const express= require('express');
const app= express();

app.use(express.json());

let users = [
    { id: 1, name: "Manuradha", email: "manuradha@gmail.com", role: "HR" }, 
    { id: 2, name: "Aniket", email: "aniket@gmail.com", role: "Analyst" },
    { id: 3, name: "Yash", email: "yash@gmail.com", role: "Manager" },
    { id: 4, name: "Ananya", email: "anany@gmail.com", role: "Developer" },
    { id: 5, name: "Erica", email: "eri@gmail.com", role: "Designer" }
];

// Middleware for logging requests
const logger = (req, res, next) => { 
    console.log(`${req.method} ${req.url}`); next(); 
}; 
app.use(logger);

// Middleware for validating user data
const validateUser = (req, res, next) => {
    const { name, email, role } = req.body; 
    if (!name || !email || !role) {
        return res.status(400).json({ error: "Name, email, and role are required" }); 
    } 
    next(); 
};

// Routes for user data
app.get("/user",(req,res)=>{
    res.json(users);
});

// Get user by ID
app.get("/user/:id",(req,res)=>{
    const id = req.params.id;
    const user = users.find(u => u.id == id);  
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// add a new user
app.post('/users', validateUser, (req, res) => {
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// update user by ID
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id ==req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { name, email, role } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    res.json(user);
});

// delete user by ID
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index == -1) return res.status(404).json({ error: "User not found" });

    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
});


app.listen(3000, ()=> console.log("Server is running on port 3000"));