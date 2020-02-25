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

// REMOVE EQUIPMENTS
router.get("/:id/remove", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Equipments.findByIdAndRemove(id);
    return res.redirect("/equipments");
  } catch {
    next();
  }
});

/* ADD NEW EQUIPMETS */

router.get("/add", async (req, res, next) => {
  return res.render("equipments/newEquipment");
});

router.post("/add", async (req, res, next) => {
  const { reference, name, model, stock, url } = req.body;
  const newEquip = await Equipments.create({
    reference,
    name,
    model,
    stock,
    url
  });
  try {
    res.redirect("/equipments");
  } catch {
    return res.render("equipments/newEquipment");
  }
});

/* GET find a equipments according to its id and EDIT*/
router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const equipments = await Equipments.findById(id);
    res.render("equipments/editEquipment", {
      equipments
    });
    console.log(req.params); // ELIMINAR <----------------------- OJO!
  } catch (error) {
    console.log(`"Equipments".js - Error finding equipments by id ${error}`);
  }
});

/* POST Edit equipmets */

router.post("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  const { reference, name, model, stock, url } = req.body;
  console.log(req.body);
  await Equipments.update({
    reference,
    name,
    model,
    stock,
    url
  });
  try {
    return res.redirect("/equipments/" + id);
  } catch {
    next();
  }
});

/* GET find a equipments according to its id */
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
