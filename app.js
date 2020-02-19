require("dotenv").config();

const path = require("path");
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passportRouter = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");

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

//  Setup
// app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
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
// app.use(flash());

// require("./passport")(app);

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
app.use(express.static(path.join(__dirname, "public")));


// Routes middleware goes here

const index = require("./routes/index");
app.use("/", index);

const passportRoutes = require("./routes/passportRoutes");
app.use("/", passportRoutes);

const crudEmployees = require("./routes/crudEmployees");
app.use("/employees", crudEmployees);

module.exports = app;