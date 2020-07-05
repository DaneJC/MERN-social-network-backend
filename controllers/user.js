const User = require("../models/user");

/*
 * routes contianing userID first invoke ../contorllers/auth/getUserById() which
 * obtains the user profile and adds it to the req object <profile> param,
 * req.profile can then be used to compare userID for CRUD operaions etc. 
 * and to retrieve other elements relating to that userId.
 */
exports.getUserById = (req, res, next, id) => {
    User.findById(id)
        // populate followers and following users array
        // .populate('following', '_id name')
        // .populate('followers', '_id name')
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found",
                });
            }console.log(user);
            req.profile = user; 
            next(); // proceed to next request with <user> in req.profile param.
        });
};

exports.hasAuthorization = (req, res, next) => {
    let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
    let adminUser = req.profile && req.auth && req.auth.role === "admin";

    const authorized = sameUser || adminUser;

    // console.log("req.profile ", req.profile, " req.auth ", req.auth);
    // console.log("SAMEUSER", sameUser, "ADMINUSER", adminUser);

    // 403 error will prevent unathorized user operations
    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action.",
        });
    }
    next();
};
