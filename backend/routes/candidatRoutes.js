const express = require("express");
const router = express.Router();
const candidatController = require("../controllers/candidatController");

router.get("/", candidatController.getAll);
router.get("/:id", candidatController.getById);
router.post("/", candidatController.add);
router.put("/:id", candidatController.update);
router.delete("/:id", candidatController.delete);
router.get("/search", candidatController.search); // Exemple : /search?keyword=Jean

module.exports = router;
