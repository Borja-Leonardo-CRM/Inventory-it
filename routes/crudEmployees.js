const express = require("express");
const router = express.Router();
const Employees = require("../models/employees");

// CRUD -> (R) Retrieve
router.get("/", async (req, res, next) => {
  try {
    const employees = await Employees.find();
    res.render("employees/showEmployee", {
      employees
    });
  } catch (error) {
    console.log(`Employees.js - Error retrieving all employees ${error}`);
  }
});

/* GET find a employee according to its id */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employees = await Employees.findById(id);
    res.render("employees/showEmployee", {
      celebrity
    });
  } catch (error) {
    console.log(`Employees.js - Error finding employee by id ${error}`);
  }
});

module.exports = router;
