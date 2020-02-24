const express = require("express");
const passportRouter = express.Router();
const User = require("../models/User"); // Require user model
const { hashPassword } = require("../lib/hashing");
const passport = require("passport"); // Add passport
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

// Signin route
passportRouter.get("/signup", isLoggedOut(), (req, res, next) => {
  res.render("passport/signup");
});

passportRouter.post("/signup", isLoggedOut(), async (req, res, next) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    const newUser = await User.create({
      username,
      password: hashPassword(password)
    });
    //req.flash("error", `Created user ${username}`);
    return res.redirect("/");
  } else {
    //req.flash("error", "User already exists with this username");
    return res.redirect("passport/signup");
  }
});

// Login route
passportRouter.get("/login", isLoggedOut(), (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/employees",
    failureRedirect: "/login"
  })
);

passportRouter.get("/logout", isLoggedIn(), async (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = passportRouter;
