require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");

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

require("./passport")(app);
// app.use(flash());

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

app.use((req, res, next) => {
  app.locals.user = req.user;
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

module.exports = app;
