const express = require("express");
const router = express.Router();
const controller = require("../controllers/inscriptionController");

router.get("/", controller.getAll);
router.get("/count", controller.getCount);
router.get("/count/inscrit", controller.getInscrit);
router.get("/details", controller.getAllWithDetails);
router.get("/search", controller.search);
router.get("/valides", controller.getCandidatsValides);
router.get("/:id", controller.getById);
router.post("/", controller.add);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;