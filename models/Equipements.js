const mongoose = require("mongoose");

const schemaEquipements = new mongoose.Schema({
  reference: String,
  name: String,
  model: String,
  stock: Number,
  url: String
});

const model = mongoose.model("equipement", schemaEquipements);
module.exports = model;
