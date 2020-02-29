const express = require("express");
const passportRouter = express.Router();
const User = require("../models/User"); // Require user model
const { hashPassword } = require("../lib/hashing");
const passport = require("passport"); // Add passport
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");

// Signup route
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
    req.flash("success", `Created user ${username}`);
    return res.redirect("/login");
  } else {
    req.flash("error", "User already exists with this username");
    return res.redirect("/signup");
  }
});

// Login route
passportRouter.get("/login", isLoggedOut("/"), (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/employees",
    successFlash: "Welcome back to the Inventory-IT",
    failureRedirect: "/login",
    failureFlash: "Invalid username or password",
    passReqToCallback: true
  })
);

passportRouter.get("/", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("/employees", { users: req.users });
});

// Logout route
passportRouter.get("/logout", isLoggedIn(), async (req, res, next) => {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/login");
});

module.exports = passportRouter;
