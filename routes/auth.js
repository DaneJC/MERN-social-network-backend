const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { signupValidator, loginValidator } = require("../utils/validator");

// router.get("/user", getPosts);
router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/logout", logout);

/*
 * routes contianing userID invoke ../contorllers/auth/getUserById() which 
 * obtains the user profile and adds it to the req object profile param, 
 * req.profile can then be used to retrieve other elements relating to 
 * that user.
 */
router.param("userId", getUserById);

module.exports = router;
