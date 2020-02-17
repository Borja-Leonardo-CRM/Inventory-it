require("dotenv").config();

const path = require("path");
const hbs = require("hbs");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passportRouter = require("passport");
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

const passport = require("./routes/passportRoutes");
app.use("/", passport);


module.exports = app;