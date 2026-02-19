const express  = require("express");
const fs = require("fs");
const users  = require("./MockData.json")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//RestAPI to get all users

// app.get('/users', (req, res) => {
//     res.json(users);
// });

app.get("/user",(req,res)=>{
    const html  = `
    <ul>
    ${users.map((user) => `<li> ${user.first_name}  ${user.last_name}</li>`)}
    </ul>`
    res.send(html);
});
app.post("/api/users",(req,res)=>{
    //To do: Create the new User 
    const {first_name,last_name,email,gender,Job_title} = req.body;
    const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        gender,
        Job_title
    }
    users.push(newUser);
    fs.writeFile("./MockData.json",JSON.stringify(users,null,2),()=>{
        res.status(201).json({message:"User created successfully",user:newUser});
    });
    

});
app.patch("/api/users/:id",(req,res)=>{
    //To do: Create the new User 
    const id = req.params.id;
    const {first_name,last_name,email,gender,Job_title} = req.body;
    const newUser = {
        id: parseInt(id),
        first_name,
        last_name,
        email,
        gender,
        Job_title
    }
    const userIndex = users.findIndex((u)=> u.id==parseInt(id));
    if(userIndex !== -1){
        users[userIndex] = newUser;
        fs.writeFile("./MockData.json",JSON.stringify(users,null,2),()=>{
            res.status(201).json({message:"User updated successfully",user:newUser});
        });
    }
    else{
        res.status(404).json({message:"User not found"});
    }
    
});
app.delete("/api/users/:id",(req,res)=>{
    //To do: Delete the new User 
    const id = req.params.id;
    const userIndex = users.findIndex((u)=> u.id==parseInt(id));
    if(userIndex == -1){
        res.status(404).json({message:"User not found"});
    }else{
        users.splice(userIndex,1);
        fs.writeFile("./MockData.json",JSON.stringify(users,null,2),()=>{
            res.status(201).json({message:"User deleted successfully",user:users[parseInt(userIndex)]});
        });
    }
    
});





app.get("/api/users",(req,res)=>{
    res.json(users)
});


app.get("/api/users/:id",(req,res)=>{
    const id = req.params.id;
    const user = users.find((u)=> u.id==id);
    return res.json(user);
});



app.listen(8000, () => {console.log('Server is running on port 8000');});