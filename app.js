require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const User = require("./models/User");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const LocalStrategy = require("passport-local").Strategy;

mongoose
  .connect(process.env.DBURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cookieParser());

app.use(
  session({
    secret: "leoandborjapassword",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

passport.serializeUser((users, callback) => {
  callback(null, users._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(users => {
      callback(null, users);
    })
    .catch(error => {
      callback(error);
    });
});

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (username, password, callback) => {
      User.findOne({ username })
        .then(users => {
          if (!users) {
            return callback(null, false, { message: "Incorrect username" });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return callback(null, false, { message: "Incorrect password" });
          }
          callback(null, users);
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());

require("./passport")(app);

// Express View engine setup
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.use((req, res, next) => {
  app.locals.user = req.user;
  app.locals.error = req.flash("error");
  app.locals.success = req.flash("success");
  next();
});

// Routes middleware goes here
const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

const passportRoutes = require("./routes/passportRoutes");
app.use("/", passportRoutes);

const crudEmployees = require("./routes/crudEmployees");
app.use("/employees", crudEmployees);

const crudEquipments = require("./routes/crudEquipments");
app.use("/equipments", crudEquipments);

const assignItem = require("./routes/assignRouter");
app.use("/assign", assignItem);

module.exports = app;
