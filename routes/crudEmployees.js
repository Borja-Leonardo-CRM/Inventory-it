const express = require("express");
const router = express.Router();
const Employees = require("../models/employees");

// CRUD -> (R) Retrieve
router.get("/", async (req, res, next) => {
  try {
    const employees = await Employees.find();
    res.render("employees/indexEmployee", {
      employees
    });
  } catch (error) {
    console.log(`Employees.js - Error retrieving all employees ${error}`);
  }
});

/* GET form to add a employees */
router.get("/new", (req, res, next) => {
  res.render("employees/newEmployee");
});

/* GET form to add a employees */
router.post("/new", async (req, res, next) => {
  console.log(req.body);

  try {
    const employee = new Employees({
      name: req.body.name,
      department: req.body.department,
      equipmentsId: req.body.equipmentsId
    });
    const obj = await Employees.create(employee);
    console.log(`Employees.js - Added new employee ${obj}`);
    res.redirect("/employees");
  } catch (error) {
    console.log(`Employees.js - Error adding new employee ${error}`);
    res.render("employees/newEmployee");
  }
});

/* GET find a employee according to its id */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employees = await Employees.findById(id);
    res.render("employees/indexEmployee", {
      employees
    });
  } catch (error) {
    console.log(`Employees.js - Error finding employee by id ${error}`);
  }
});

module.exports = router;
