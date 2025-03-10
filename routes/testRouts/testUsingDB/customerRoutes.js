// routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const { pool } = require("../../../dbConfig/dbConfig");

/**
 * 🔍 GET /api/customer/:customerID
 * Fetch customer details by customerID
 */
router.get("/custdb", async (req, res) => {
  try {
    const clientid = req.query.clientId; // Read from query instead of params

    if (!clientid) {
      return res.status(400).json({ message: "clientId is required" });
    }

    // Execute query
    const [rows] = await pool.promise().query(
      "SELECT * FROM dfcc_fos_v2_master.t_dfcc_co_borrowerdetail WHERE clientid = ?", 
      [clientid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
