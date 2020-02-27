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
    res.render("assignEquipments/assignItem", {
      employee,
      equipment
    });
  } catch (error) {
    console.log("Employee dont found");
  }
});

// Refresh

router.get("/:id/refresh", async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);
    const equipment = await Equipments.find();
    res.json({
      employee,
      equipment
    });
  } catch (error) {
    console.log("Employee dont found");
  }
});

router.post("/newItem", async (req, res, next) => {
  const { item, e } = req.body;
  const id = e;
  const reference = toNumber(item);
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
  res.json({});
});

router.post("/removeItem", async (req, res, next) => {
  const { item, e } = req.body;
  const id = e;
  const reference = toNumber(item);

  Promise.all([
    await Employees.updateOne(
      {
        _id: id
      },
      {
        $pull: {
          equipmentsId: reference
        }
      }
    ),
    await Equipments.find({
      $project: {
        reference: reference
      },
      stock: {
        $sum: 1
      }
    })
  ]);

  res.json({});
});

// String to Number
function toNumber(strg) {
  if (typeof strg != Number) {
    return parseInt(strg);
  } else {
    return strg;
  }
}

module.exports = router;
