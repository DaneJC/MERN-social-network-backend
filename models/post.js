const mongoose = require("mongoose");
// const { ObjectID }  = mongoose.Schema;

const postSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true,
    //     minlength: 4,
    //     maxlength: 150,
    // },
    body: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 2000,
    },
    // * Buffer - store img as raw binary in db *
    photo: {
        type: Buffer,
        contentType: String
    },
    // * mongoose relationship *
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
});

module.exports = mongoose.model("Post", postSchema);
