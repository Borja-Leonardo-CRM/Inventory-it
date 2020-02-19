const mongoose = require("mongoose");

const schemaEmployees = new mongoose.Schema({
  name: String,
  department: String,
  equipmentsId: []
});

const model = mongoose.model("employee", schemaEmployees);

module.exports = model;