const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/User.js');
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(new localStrategy(async function(username,password,done){
        try{
        const userFound =await User.findOne({username});
        if(!userFound){
            return done(null,false,{message:"User not found"});
        }
        const passMatch = await bcrypt.compare(password,userFound.password);
        if(!passMatch){
            return done(null,false,{message:"Incorrect password"});
        }
        return done(null,userFound);
    }
    catch(err){
        return done(err);
    }
    }));


    passport.serializeUser(function(user,done){
        console.log("Serializing user:",user);
        done(null,user._id);
    });


    passport.deserializeUser(async function(id,done){
        try{
            const user = await User.findById(id);
            done(null,user);
        }
        catch(err){
            done(err);
        }

    });
}