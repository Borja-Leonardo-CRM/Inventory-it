const express = require("express");
const router = express.Router();

const Employees = require("../models/Employees");
const Equipments = require("../models/Equipments");

/* Route to assign */

router.get("/:id/assign", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);
    const equipment = await Equipments.find();
    console.log("blablabla");
    console.log(employee);
    res.render("assignEquipments/assignItem", {
      employee,
      equipment
    });
  } catch (error) {
    console.log("Employee dont found");
  }
});

router.post("/:id/assign", async (req, res, next) => {
  console.log(req.body);
  const { item, e } = req.body;
  console.log(item, e, "JA!");
  const id = e;
  const reference = item;
  // const employee = await Employees.findById(id);
  await Employees.updateOne(
    {
      _id: id
    },
    {
      $push: {
        equipmentsId: reference
      }
    }
  );
  try {
    return console.log(`${equipmentsId} assigned `);
  } catch {
    next();
  }
});

module.exports = router;
