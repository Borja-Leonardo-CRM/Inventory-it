const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const schemaEmployees = new mongoose.Schema({
//   identity: Number,
//   name: String,
//   department: String,
//   equipmentsId: [{ type: Schema.ObjectId, ref: "Equipment" }]
// });

const schemaEmployees = new mongoose.Schema({
  identity: Number,
  name: String,
  department: String,
  equipmentsId: []
});

const model = mongoose.model("Employees", schemaEmployees);

module.exports = model;
