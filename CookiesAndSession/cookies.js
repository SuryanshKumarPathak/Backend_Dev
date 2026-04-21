const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/cookieDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model("User", userSchema);


app.post("/create-user", async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: "username required" });
        }

        // save in DB
        const user = new User({ username });
        await user.save();

        // set cookie
        res.cookie("username", username, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        res.json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/get-cookie", (req, res) => {
    const user = req.cookies.username;

    if (user) {
        res.send(`hello ${user}`);
    } else {
        res.send("no cookies found");
    }
});


app.get("/delete-cookie", (req, res) => {
    res.clearCookie("username");
    res.send("cookie deleted");
});


app.post("/set-preference", (req, res) => {
    const { theme, language } = req.body;

    const data = {
        theme: theme || "light",
        language: language || "en",
    };

    res.cookie("preferences", JSON.stringify(data), {
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ message: "preferences saved", data });
});


app.get("/get-preference", (req, res) => {
    const pref = req.cookies.preferences;

    if (!pref) {
        return res.send("no preference found");
    }

    const parsed = JSON.parse(pref);
    res.json(parsed);
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});