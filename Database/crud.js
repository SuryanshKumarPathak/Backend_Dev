const express =  require('express');
const mongoose = require('mongoose');

const app = express();

//Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/BlogDB')
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});



//Schema Definition
const userSchema  = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
        // enum: ['Male', 'Female', 'Other']
    }
},
{timestamps:true},
);


const userModel = mongoose.model('User', userSchema);

//Middleware for the url encoding
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//View Data 
app.get("/users", async (req, res) => {
        const users = await userModel.find();
        const html=`
        <ul>
        ${users.map(user => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`).join('')}
        </ul>
        `;
        res.send(html);
});


app.get("/api/users",async (req,res)=>{
    const users = await userModel.find();
    res.json(users);
})


//Create Data
app.post("/users", async (req, res) => {
    const body = req.body;
    if(!body.firstName || !body.lastName || !body.email|| !body.jobTitle || !body.gender){
        return res.status(400).send("All fields are required");
    }
    const result  = await userModel.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle,
        gender: body.gender
    });
    console.log("result:", result);
    return res.status(201).json(result);
    });

    //update data
    app.patch("/users/:id", async (req, res) => {
    await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
    )
    .then((updatedUser) => {
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    })
    .catch((err) => {
        res.status(500).json({ error: err.message });
    });
});
    



    app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
