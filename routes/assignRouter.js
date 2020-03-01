const express = require("express");
const router = express.Router();

const Employees = require("../models/Employees");
const Equipments = require("../models/Equipments");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");

/* Route to assign */

router.get(
  "/:id/assign",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
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
  }
);

router.post("/newItem", async (req, res, next) => {
  const { item, e } = req.body;
  const id = e; // Id employee
  const reference = item;
  const referenceItem = toNumber(item);
  const dataReference = await Equipments.findOne({ reference: reference });
  const dataStock = dataReference.stock - 1;
  const idItem = dataReference._id; // id of item
  let equipment;
  const employee = await Employees.findOneAndUpdate(
    {
      _id: id
    },
    {
      $push: {
        equipmentsId: dataReference
      }
    }
  );
  await Equipments.findOneAndUpdate(
    {
      reference: reference
    },
    {
      stock: dataStock
    }
  );
  // await Employees.findOne({ _id: id }).then(e => {
  //   equipment = e.equipmentsId;
  // });
  res.json({});
});

// router.post("/newItem", async (req, res, next) => {
//   const { item, e } = req.body;
//   const id = e;
//   const referenceItem = toNumber(item);
//   const stock = await Equipments.find({
//     reference: referenceItem
//   });

//   const stockUpdate = subtraction(stock);
//   // const employee = await Employees.findById(id);
//   await Employees.updateOne(
//     {
//       _id: id
//     },
//     {
//       $push: {
//         equipmentsId: referenceItem
//       }
//     }
//   );
//   await Equipments.updateOne(
//     {
//       reference: referenceItem
//     },
//     {
//       stock: stockUpdate
//     }
//   );
//   //console.log(stockUpdate);
//   res.json({ stock });
// });

router.post("/removeItem", async (req, res, next) => {
  const { item, e } = req.body;
  const id = e; // Id employee
  const idItem = item; // Id item
  const referenceItem = toNumber(item);
  const dataReference = await Equipments.findOne({ _id: idItem });
  const dataStock = dataReference.stock + 1;
  // const stock = await Equipments.find({
  //   reference: referenceItem
  // });

  // const stockUpdate = sum(stock);

  await Employees.findOneAndUpdate(
    {
      _id: id
    },
    {
      $pull: {
        equipmentsId: {
          _id: idItem
        }
      }
    }
  ),
    await Equipments.findOneAndUpdate(
      {
        _id: idItem
      },
      {
        stock: dataStock
      }
    );

  res.json({});
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
// Show Stock

router.post("/stock", async (req, res, next) => {
  const { item } = req.body;
  const referenceItem = toNumber(item);

  const currentStock = await Equipments.find({
    reference: referenceItem
  });

  res.json(currentStock);
});

// String to Number
function toNumber(strg) {
  if (typeof strg != Number) {
    return parseInt(strg);
  } else {
    return strg;
  }
}

// Stock Upgrade

function subtraction(stock) {
  x = parseInt(stock[0]["stock"]);
  if (x > 0) {
    return x - 1;
  } else {
    return 0;
  }
}

function sum(stock) {
  x = parseInt(stock[0]["stock"]);
  return x + 1;
}

module.exports = router;
