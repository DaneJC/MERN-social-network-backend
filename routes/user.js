const express = require("express");
const {
    getUserById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    // findPeople,
    hasAuthorization
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.put("/user/follow", requireSignin, addFollowing, addFollower);
router.put("/user/unfollow", requireSignin, removeFollowing, removeFollower);

router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignin, hasAuthorization, deleteUser);
// photo
router.get("/user/photo/:userId", userPhoto);

// who to follow
// router.get("/user/findpeople/:userId", requireSignin, findPeople);

/*
 * routes contianing userID invoke ../contorllers/auth/getUserById() which 
 * obtains the user profile and adds it to the req object profile param, 
 * req.profile can then be used to retrieve other elements relating to 
 * that user.
 */
router.param("userId", getUserById);

module.exports = router;