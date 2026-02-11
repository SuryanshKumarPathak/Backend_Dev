import express from "express";
const app = express();
app.use(express.json());
import {user} from "./Data.js"
//View the data
app.get("/users", (req, res) => {
    res.json(user);
});



// http://localhost:8000/users/2
//Delete the data 
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = user.findIndex((u) => u.id === id);
    
    if (index !== -1 && user[index].marks<70) {
        user.splice(index, 1);
        res.status(200).json({ message: `User with id ${id} deleted successfully.`, users: user });
    } else {
        res.status(404).json({ error: `User with id ${id} not found.` });
    }
});

app.listen(8000, () => console.log("Server Started"));