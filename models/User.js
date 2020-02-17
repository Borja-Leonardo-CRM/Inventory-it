const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
  username: { type: String, unique: true, index: true },
  password: String,
  roll: { type: String, default: 0 }
});

/* Investigar bien lo del usuario único. También he puesto 
que el roll por defecto sea 0, de manera que 0 sea igual a EDITOR y,
por ejemplo, 1, sea igual a Administrador. */

const model = mongoose.model("user", schemaUser); // Aquí generamos la BBDD

// Aquí comprobamos que el usuario sea único. Investigar.z
model.collection
  .createIndexes([
    {
      key: { username: 1 },
      name: "username"
    }
  ])
  .catch(e => console.log(e));

module.exports = model;
