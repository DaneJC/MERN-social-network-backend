const express = require("express");
const router = express.Router();
const {signup, login, logout} = require("../controllers/auth");
const {signupValidator, loginValidator} = require("../utils/validator");


// router.get("/user", getPosts);
router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/logout", logout);


module.exports = router;