const mongoose = require("mongoose");

const schemaEquipments = new mongoose.Schema({
  reference: Number,
  name: String,
  model: String,
  stock: Number,
  url: String
});

const model = mongoose.model("Equipment", schemaEquipments);
module.exports = model;
