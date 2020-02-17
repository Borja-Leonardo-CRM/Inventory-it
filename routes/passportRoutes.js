const express = require("express");
const passportRouter = express.Router();

// Require user model
const User = require("../models/User");


// Add passport
const passport = require("passport");
//LocalStrategy = require("passport-local").Strategy;

// Signin route
passportRouter.get("/signup", (req, res, next) => {
  res.render("passport/signup"), {

  };
});



module.exports = passportRouter;