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
    console.log("Recibido!!!!!");
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
  const newAssign = await Employees.updateOne(
    {
      _id: id
    },
    {
      $push: {
        equipmentsId: reference
      }
    }
  );
  // try {
  //   console.log(`${newAssign} assigned `);
  //   return res.redirect(`/assign/${id}/assign`);
  // } catch {
  //   console.log(`${newAssign} assigned but error`);
  //   next();
  // }
});

module.exports = router;
