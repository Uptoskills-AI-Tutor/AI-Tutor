const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/adminController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/admin/dashboard", verifyToken, getDashboardData);

module.exports = router;
