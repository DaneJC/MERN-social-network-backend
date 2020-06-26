const express = require("express");
const router = express.Router();
const {getPosts, createPost} = require("../controllers/post");
const {createPostValidator} = require("../utils/validator");


// router.get("/", (req, res) => res.send("home"));
router.get("/post", getPosts);
router.post("/post", createPostValidator, createPost);


module.exports = router;
