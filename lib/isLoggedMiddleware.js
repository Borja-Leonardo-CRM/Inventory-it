const loginCheckWrapper = checkFn => (
  redirectRoute = "/login",
  json = false
) => (req, res, next) => {
  if (checkFn(req, res)) {
    return next();
  } else {
    if (json) {
      return res.status(401).json({ error: "You have to login first" });
    } else {
      return res.redirect(redirectRoute);
    }
  }
};

const isLoggedIn = loginCheckWrapper((req, res) => req.user);
const isLoggedOut = loginCheckWrapper((req, res) => !req.user);

module.exports = {
  isLoggedIn,
  isLoggedOut
};
