const express = require("express");
const router = express.Router();
// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// router.get('/', ensureAuthenticated, (req, res) =>
router.get('/', (req, res) => res.send('home'));

module.exports = router;
