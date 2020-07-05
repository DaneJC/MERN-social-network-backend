const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const { nextTick } = require("process");

/*
 * routes contianing postID first invoke ../contorllers/post/getPostsById() which
 * obtains the post relating to postID and adds it to the req object <post> param,
 * req.post can then be used to compare author id user for retrieve, update & 
 * delete operations.
 */
exports.getPostById = (req, res, next, id) => {
    Post.findById(id)
        .populate('author', '_id forname surname')
        // .populate('comments.postedBy', '_id name')
        // .populate('postedBy', '_id name role')
        // .select('_id title body created likes comments photo')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                });
            }
            req.post = post;
            next(); // proceed to next request with <post> in req.post param.
        });
};

exports.createPost = (req, res, next) => {
    /* ##### PRE-AUTHORIZATION IMPLEMENTATION ##### */
    // const post = new Post(req.body);
    // console.log("creating post:", req.body);
    // post.save().then(post => res.json({post}));

    /* ##### POST-AUTHORIZATION IMPLEMENTATION ##### */
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    console.log("in");
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Image could not be uploaded.",
            });
        }
        // create new Post with the fields received from the request
        let post = new Post(fields);

        // assign the post to a User (author)
        req.profile.pw_hash = undefined;
        req.profile.salt = undefined;
        post.author = req.profile;

        // if files (photos) in request - handle files.
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        // save the post to db
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json(result);
        });
    });
    // next();
};

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate("author", "_id forename surname")
        // .populate("comments", "text created")
        // .populate("comments.postedBy", "_id name")
        // .select("_id title body created likes")
        .select("_id title body created")
        // .sort({ created: -1 })
        .then((posts) => {
            res.json(posts);
        })
        .catch((err) => console.log(err));
};

exports.getPostsByUser = (req, res) => {
    Post.find({ author: req.profile._id })
        .populate('author', '_id forename surname')
        // .select('_id title body created likes')
        .select('_id title body created')
        .sort('_created')
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts);
        });
};

/*
 * post update and delete operations are permitted by the post author,
 * isAuthor() is invoked during such operation attempt to confirm the 
 * post author and userId match.
 */
exports.isAuthor = (req, res, next) => {
    let sameUser = req.post && req.auth && req.post.author._id == req.auth._id;
    // let adminUser = req.post && req.auth && req.auth.role === 'admin';

    // console.log("req.post ", req.post, " req.auth ", req.auth);
    // console.log("SAMEUSER: ", sameUser, " ADMINUSER: ", adminUser);

    // let isPoster = sameUser || adminUser;
    let isPoster = sameUser;

    if (!isPoster) {
        return res.status(403).json({
            error: 'User is not authorized.'
        });
    }
    next();
};

exports.updatePost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let post = req.post;
        post = _.extend(post, fields);
        post.updated = Date.now();

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(post);
        });
    });
};

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Post successfully deleted.'
        });
    });
};