const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const {MongoStore} = require('connect-mongo');

require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key' ,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    }
}));




mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log(' Connected to MongoDB');
})
.catch(err => {
    console.error(' MongoDB connection error:', err);
}); 




app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect("/login");
})


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
})





app.get('/', (req, res) => res.send('Hello World!'))
const PORT= process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))