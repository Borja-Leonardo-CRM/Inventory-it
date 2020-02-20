const express = require("express");
const router = express.Router();
const Equipments = require("../models/Equipments");

console.log("hola");

// CRUD -> (R) Retrieve
router.get("/", async (req, res, next) => {
  try {
    const equipments = await Equipments.find();
    res.render("equipments/indexEquipment", {
      equipments
    });
  } catch (error) {
    console.log(`Equipments.js - Error retrieving all equipments ${error}`);
  }
});

/* GET find a employee according to its id */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const equipments = await Equipments.findById(id);
    res.render("equipments/showEquipment", {
      equipments
    });
  } catch (error) {
    console.log(`"Equipments".js - Error finding equipments by id ${error}`);
  }
});

module.exports = router;
