const express = require("express");
const passportRouter = express.Router();
const User = require("../models/User"); // Require user model// Add passport
//LocalStrategy = require("passport-local").Strategy;

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
      password
    });
  }

  return res.redirect("/");
});

module.exports = passportRouter;