const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        checkHashed(password, foundUser.password)
          ? DelayNode(null, foundUser)
          : done(null, false);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  })
);

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
