require("dotenv").config();
const path = require("path");
const hbs = require("hbs");



const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

const index = require("./routes/index");
app.use("/", index);

module.exports = app;