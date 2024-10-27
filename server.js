const express = require("express"); // to build out the API
const mongoose = require("mongoose"); // to talk to MongoDB database
const passport = require("passport"); // to use different strategies for logins
const session = require("express-session"); // to have users to stay logged in as they move across app
const MongoStore = require("connect-mongo"); // to store the user's session in MongoDB
const methodOverride = require("method-override"); // to override methods and use put/delete reqs
const flash = require("express-flash"); // to show notifications for errors, info, etc.
const logger = require("morgan"); // to show logs in console
const connectDB = require("./config/database"); // to connect to db
const mainRoutes = require("./routes/main"); // setup of main route
const postRoutes = require("./routes/posts"); // setup of posts route

// use config.env file in config folder
require("dotenv").config({ path: "./config/.env" });

// passport config
require("./config/passport")(passport);

// connect to database
connectDB();

const app = express(); // using express

// using EJS for views
app.set("view engine", "ejs");

// static folder
app.use(express.static("public"));

// body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logging
app.use(logger("dev"));

// use forms for put/delete
app.use(methodOverride("_method"));

// setup of sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING })
    }),
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use flash messages for errors, info, etc.
app.use(flash());

// setup of routes for which the server is listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

// server running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
