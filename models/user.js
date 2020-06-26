const mongoose = require("mongoose");
const uuidv1 = require('uuidv1');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    forename: {
        type: String,
        trim: true,
        required: true
    },
    surname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    pw_hash: {
        type: String,
        trim: true,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

/* ##### VIRTUAL FIELDS ##### */ 
userSchema
    .virtual("password")
    .set(function(password) {
        // create temporary variable called _password
        this._password = password;
        // generate a timestamp
        this.salt = uuidv1();
        // encryptPassword()
        this.pw_hash = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

/* ##### METHODS ##### */ 
userSchema.methods = {

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            console.log(uuidv1());
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);