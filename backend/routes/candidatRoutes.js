const express = require("express");
const router = express.Router();
const candidatController = require("../controllers/candidatController");

router.get("/", candidatController.getAll);
router.get("/count", candidatController.getCount);
router.get("/:id", candidatController.getById);
router.post("/", candidatController.add);
router.put("/:id", candidatController.update);
router.delete("/:id", candidatController.delete);
router.get("/search", candidatController.search);

module.exports = router;
