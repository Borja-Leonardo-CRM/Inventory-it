const express = require("express");
const passportRouter = express.Router();

const User = require("../models/User"); // Require user model
const passport = require("passport"); // Add passport
const { hashPassword } = require("../lib/hashing");


// Signin route
passportRouter.get("/signup", (req, res, next) => {
  res.render("passport/signup");
});

passportRouter.post("/signup", async (req, res, next) => {
  console.log(req);
  const {
    username,
    password
  } = req.body;
  console.log(username, password);
  const userCreated = await User.findOne({
    username
  });

  if (userCreated) {
    return res.redirect("/signup");
  } else {
    await User.create({
      username,
      password: hashPassword(password)
    });
  }

  return res.redirect("/");
});


// Login route
passportRouter.get("/login", (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

module.exports = passportRouter;

