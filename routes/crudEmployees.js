const express = require("express");
const router = express.Router();
const Employees = require("../models/Employees");

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
  const identity = 5;
  if (identity > 5) {
    map((e, i) => ({ ...e, identity: i + 1 }));
  }
  res.render("employees/newEmployee");
});

/* GET form to add a employees */
router.post("/new", async (req, res, next) => {
  console.log(req.body);

  try {
    const employee = new Employees({
      identity: req.body.identity,
      name: req.body.name,
      department: req.body.department,
      equipmentsId: req.body.equipmentsId
    });
    const obj = await Employees.create(employee);
    console.log(`Employees.js - Added new employee ${obj}`);
    res.redirect("/employees/");
  } catch (error) {
    console.log(`Employees.js - Error adding new employee ${error}`);
    res.render("employees/newEmployee");
  }
});

/* POST delete a employee according to its id */
router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findByIdAndRemove(id);
    console.log(`Employees.js - Employees deleted ${employee}`);
    res.redirect("/employee");
  } catch (error) {
    console.log(`Employees.js - Error deleting employee by id ${error}`);
  }
});

/* GET edit a employee according to its id */
router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);
    res.render("employee/editEmployee", {
      employee
    });
  } catch (error) {
    console.log(`Employees.js - Error editing employee by id ${error}`);
  }
});

/* GET find a employee according to its id */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const employee = await Employees.findById(id);
    res.render("employees/editEmployee", {
      employee

    });
  } catch (error) {
    console.log(`Employees.js - Error finding employee by id ${error}`);
  }
});

module.exports = router;
