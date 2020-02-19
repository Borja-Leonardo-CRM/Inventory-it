const passport = require("passport");
const User = require("../models/User");

require("./strategies/local");

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => callback(null, user))
    .catch(e => callback(err));
});

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
