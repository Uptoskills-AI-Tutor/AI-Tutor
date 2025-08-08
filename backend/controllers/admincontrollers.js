// backend/controllers/adminController.js
const Admin = require("../models/Admin");

exports.getDashboardData = async (req, res) => {
  try {
    // Example response; replace with real logic
    res.status(200).json({
      message: "Admin Dashboard Data",
      stats: {
        users: 120,
        courses: 8,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
