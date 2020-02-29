const mongoose = require("mongoose");

const schemaEmployees = new mongoose.Schema({
  identity: Number,
  name: String,
  department: String,
  equipmentsId: []
});

const model = mongoose.model("Employees", schemaEmployees);

module.exports = model;

// const schemaEmployees = new mongoose.Schema({
//   identity: Number,
//   name: String,
//   department: String,
//   equipmentsId: [{ type: Schema.ObjectId, ref: "Equipments" }]
// });
