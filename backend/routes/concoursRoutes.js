const express = require("express");
const router = express.Router();
const concoursController = require("../controllers/concoursController");

router.post("/inscription", concoursController.addInscription);
router.get("/ouverts", concoursController.getConcoursOuverts);
router.get("/", concoursController.getAll);
router.get("/count", concoursController.count);


module.exports = router;
