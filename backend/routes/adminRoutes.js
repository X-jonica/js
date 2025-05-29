const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login); // ✅ route pour authentifier

module.exports = router;
