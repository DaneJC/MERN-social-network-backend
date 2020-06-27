const express = require("express");
const router = express.Router();
const {signup, signin, signout} = require("../controllers/auth");
const {signupValidator} = require("../utils/validator");


// router.get("/user", getPosts);
router.post("/signup", signupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);


module.exports = router;