const express = require("express");
const router = express.Router();
const Employees = require("../models/Employees");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");

// const assignItem = require("./assignRouter");
// router.use("/assign", assignItem);

// CRUD -> (R) Retrieve
//router.get("/", async (req, res, next) => {
// try {
//  const employees = await Employees.find();
//  res.render("employees/indexEmployee", {
//    employees

// INDEX - show all employees
router.get("/", ensureLogin.ensureLoggedIn(), function(req, res) {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    // Get all the employees from DB
    Employees.find({ name: regex }, function(err, allEmployees) {
      if (err) {
        console.log(err);
      } else {
        res.render("employees/indexEmployee", { employees: allEmployees });
      }
    });
  } else {
    // Get all the employees from DB
    Employees.find({}, function(err, allEmployees) {
      if (err) {
        console.log(err);
      } else {
        res.render("employees/indexEmployee", { employees: allEmployees });
      }
    });
  }
});

/* GET form to add a employees */
router.get("/new", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const identity = 5;
  if (identity > 5) {
    map((e, i) => ({ ...e, identity: i + 1 }));
  }
  res.render("employees/newEmployee");
});

/* GET form to add a employees */
router.post("/new", async (req, res, next) => {
  try {
    const employee = new Employees({
      identity: req.body.identity,
      name: req.body.name,
      department: req.body.department,
      equipmentsId: req.body.equipmentsId
    });

    const obj = await Employees.create(employee);
    console.log(`Employees.js - Added new employee ${obj}`);
    req.flash("success", "New employee added!");
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

/* GET find a equipments according to its id and EDIT*/
router.get(
  "/:id/edit",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const employee = await Employees.findById(id);
      res.render("employees/editEmployee", {
        employee
      });
    } catch (error) {
      console.log(`"Employees".js - Error finding employee by id ${error}`);
    }
  }
);

router.post("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { identity, name, department, equipmentsId } = req.body;
  await Employees.update({
    identity,
    name,
    department,
    equipmentsId
  });
  try {
    return res.redirect("/employees/" + id);
  } catch {
    next();
  }
});

/* GET find a employee according to its id */
router.get("/:id", ensureLogin.ensureLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);
    res.render("employees/showEmployee", {
      employee
    });
  } catch (error) {
    console.log(`Employees.js - Error finding employee by id ${error}`);
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
