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
