require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5693;

// Enable CORS
app.use(cors({credentials: true, origin: true}));
app.use(express.json());

// Middleware API route
app.get("/api/qr", async (req, res) => {
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

// coborrower API route
app.get("/api/coborrower-details", async (req, res) => {
    const { leadCustomer } = req.query;
    if (!leadCustomer) {
        return res.status(400).json({ error: "CIF_NO parameter is required" });
    }

    try {
        const response = await axios.get(`http://10.18.50.145:7800/esb/fo_coborrower/v1/getCoborrowerDetails?leadCustomer=${leadCustomer}`, {
            headers: {
                'credentials': 'OBBANK0800/AAbank@100'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch Coborrower data" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});