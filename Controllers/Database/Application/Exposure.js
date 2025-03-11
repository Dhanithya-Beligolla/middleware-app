const express = require("express");
const { pool } = require("../../../dbConfig/dbConfig");

exports.getExposureDetails = async (req, res) => {
    try {
        const client_no = req.query.client_no; // Read from query instead of params
    
        if (!client_no) {
          console.log("client_no is missing in the request");
          return res.status(400).json({ message: "client_no is required" });
        }
    
        // Execute query
        const [rows] = await pool.promise().query(
          "SELECT * FROM dfcc_fos_v2_master.t_dfcc_exposure WHERE client_no = ?", 
          [client_no]
        );
     
        if (rows.length === 0) {
          console.log(`No Exposure details found with client_no: ${client_no}`);
          return res.status(404).json({ message: "Customer not found" });
        }
    
        res.json(rows[0]);
      } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
};