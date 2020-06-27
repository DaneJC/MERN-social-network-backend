const express = require("express");
const router = express.Router();
const {requireSignin} = require("../controllers/auth");
const {getPosts, createPost} = require("../controllers/post");
const {createPostValidator} = require("../utils/validator");


// router.get("/", (req, res) => res.send("home"));
router.get("/post", requireSignin, getPosts);
router.post("/post", createPostValidator, createPost);


module.exports = router;
