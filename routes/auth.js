const express = require("express");
const router = express.Router();
const {signup} = require("../controllers/auth");
const {signupValidator} = require("../utils/validator");


// router.get("/user", getPosts);
router.post("/signup", signupValidator, signup);


module.exports = router;