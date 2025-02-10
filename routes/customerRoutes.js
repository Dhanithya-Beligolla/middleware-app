// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig/dbConfig");

/**
 * 🔍 GET /api/customer/:customerID
 * Fetch customer details by customerID
 */
router.get("/:customerID", async (req, res) => {
  try {
    const customerID = req.params.customerID;

    // Execute query
    const [rows] = await pool.promise().query(
      "SELECT * FROM customer WHERE customerID = ?", [customerID]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(rows[0]); // Return customer data
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
