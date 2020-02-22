const express = require("express");
const router = express.Router();
const Employees = require("../models/Employees");
const Equipments = require("../models/Equipments");

/* Route to assign */

router.get("/employees/assign/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);
    res.render("assignItem/assignItem", {
      employee
    });
  } catch (error) {
    console.log("Employee dont found");
  }
});
