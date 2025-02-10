const express = require("express");
const axios = require("axios");
const route = express.Router();


// Middleware API route
route.get("/qr", async (req, res) => {
    const { CIF_NO } = req.query;
    if (!CIF_NO) {
        return res.status(400).json({ error: "CIF_NO parameter is required" });
    }

    try {
        const response = await axios.get(`http://10.18.50.145:7800/esb/DFCC_OB_NEW/v1/OB_LOAN_details?CIF_NO=${CIF_NO}`, {
            headers: {
                'credentials': 'OBBANK0800/AAbank@100'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch QR data" });
    }
});

module.exports = route;