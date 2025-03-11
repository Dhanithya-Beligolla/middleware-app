const express = require("express");
const { pool } = require("../../../dbConfig/dbConfig");

exports.getClientDetails = async (req, res) => {
    try {
        const clientno = req.query.clientno; // Read from query instead of params
    
        if (!clientno) {
          console.log("clientno is missing in the request");
          return res.status(400).json({ message: "clientno is required" });
        }
    
        // Execute query
        const [rows] = await pool.promise().query(
          "SELECT * FROM dfcc_fos_v2_master.t_dfccfos_app_client_details WHERE clientno = ?", 
          [clientno]
        );
    
        if (rows.length === 0) {
          console.log(`No customer found with clientno: ${clientno}`);
          return res.status(404).json({ message: "Customer not found" });
        }
    
        res.json(rows[0]);
      } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
};