const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const passport = require('passport');

// User model
// const User = require("../models/User");

// #####################################
// login page
router.get("/login", (req, res) => {
    res.send("login");
});


module.exports = router;