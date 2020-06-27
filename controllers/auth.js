const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');
require("dotenv").config()
const User = require("../models/user");

exports.signup = async (req, res) => { // check if user email exist in db
    const userExists = await User.findOne({email: req.body.email});
    // if email exist notify user
    if (userExists) 
        return res.status(403).json({error: "Email already exists."});
    
    // if email not in db create new user
    const user = await new User(req.body);
    await user.save();

    console.log(user);

    // respond with the newly created user
    res.json({user})
};

exports.signin = async (req, res) => { 

    
    // find user email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        
        // if error or no email found 
        if (err || !user) return res.status(401).json({error: "Email does not exist."});

        // if email exist compare password
        if(!user.authenticate(password)) return res.status(401).json({error: "Incorrect password."});

        // if password matched 
        if(user.authenticate(password)) {
            
            // generate token
            const token = jwt.sign({"_id": user._id}, process.env.JWT_SECRET);

            // store the token as 't' with expiry date in cookies
            res.cookie("t", token, {maxAge: 900000});

            // respond with user and token
            const {_id, name, email, forename, surname} = user;
            console.log(user);
            return res.json({token, user: {_id, name, email, forename, surname}});
        }
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'Signout success!' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});
