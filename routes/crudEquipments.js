const express = require("express");
const router = express.Router();
const Equipments = require("../models/Equipments");
const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");
const ensureLogin = require("connect-ensure-login");

// INDEX - show all equipments
router.get("/", ensureLogin.ensureLoggedIn(), function(req, res) {
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    // Get all the equipments from DB
    Equipments.find({ name: regex }, function(err, allEquipments) {
      if (err) {
        console.log(err);
      } else {
        res.render("equipments/indexEquipment", { equipments: allEquipments });
      }
    });
  } else {
    // Get all the equipments from DB
    Equipments.find({}, function(err, allEquipments) {
      if (err) {
        console.log(err);
      } else {
        res.render("equipments/indexEquipment", { equipments: allEquipments });
      }
    });
  }
});

// REMOVE EQUIPMENTS
router.get(
  "/:id/remove",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      await Equipments.findByIdAndRemove(id);
      return res.redirect("/equipments");
    } catch {
      next();
    }
  }
);

/* ADD NEW EQUIPMETS */

router.get("/add", ensureLogin.ensureLoggedIn(), async (req, res, next) => {
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
router.get(
  "/:id/edit",
  ensureLogin.ensureLoggedIn(),
  async (req, res, next) => {
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
  }
);

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
router.get("/:id", ensureLogin.ensureLoggedIn(), async (req, res, next) => {
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

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
