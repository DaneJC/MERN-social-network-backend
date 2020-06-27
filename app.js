/* ##### IMPORTS/CONFIG ##### */
// express
const express = require("express");
const app = express();

// mongoose
const mongoose = require("mongoose");
const db = require("./config/keys").MongoURI;

// connect mongoDB
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log("connected to MongoDB.."))
.catch(err => console.log(err));

// dotenv
require("dotenv").config();

// bodyparser
const bodyParser = require("body-parser");

// cookieparser
const cookieParser = require("cookie-parser");

// express-validator
const expressValidator = require("express-validator");

/* ##### APP ##### */
// bodyparser
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// console.log(String(process.env.MONGO_URI));

/* ##### ROUTES ##### */
app.use("/", require("./routes/post"));
app.use("/", require("./routes/auth"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Server started on port "+PORT));