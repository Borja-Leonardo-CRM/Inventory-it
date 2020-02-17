const mongoose = require("mongoose");

const schemaEmployees = new mongoose.Schema({
  name: String,
  position: String,
  roll: String,
  inventory: {
    components: { type: String, number: Number, reference: [], default: false },
    phone: { type: String, number: Number, reference: [], default: false },
    computer: { type: String, number: Number, reference: [], default: false },
    screens: { type: String, number: Number, reference: [], dfault: false }
  }
});

const model = mongoose.model("employee", schemaEmployees);
module.exports = model;
