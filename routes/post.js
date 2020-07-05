const express = require("express");
const router = express.Router();
const { requireSignin } = require("../controllers/auth");
const {
    getPostById,
    getPosts,
    createPost,
    getPostsByUser,
    isAuthor,
    updatePost,
    deletePost,
} = require("../controllers/post");
const { createPostValidator } = require("../utils/validator");
const { getUserById } = require("../controllers/user");

// router.get("/", (req, res) => res.send("home"));
router.get("/post", getPosts);

// get posts by userId
router.get("/posts/by/:userId", getPostsByUser);

/* ##### PRE-AUTHORIZATION IMPLEMENTATION ##### */
// router.post("/post", createPostValidator, createPost);

/* ##### POST-AUTHORIZATION IMPLEMENTATION ##### */
router.post(
    "/post/new/:userId",
    requireSignin,
    createPost,
    createPostValidator
);
router.delete("/post/:postId", requireSignin, isAuthor, deletePost);
router.put('/post/:postId', requireSignin, isAuthor, updatePost);

/*
 * routes contianing userID first invoke ../contorllers/auth/getUserById() which
 * obtains the user profile and adds it to the req object <profile> param,
 * req.profile can then be used to compare userID for CRUD operaions etc.
 * and to retrieve other elements relating to that userId.
 */
router.param("userId", getUserById);
/*
 * routes contianing postID first invoke ../contorllers/post/getPostsById() which
 * obtains the post relating to postID and adds it to the req object <post> param,
 * req.post can then be used to compare author id user for retrieve, update &
 * delete operations.
 */
router.param("postId", getPostById);

module.exports = router;
