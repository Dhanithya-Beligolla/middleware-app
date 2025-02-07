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
    try {
        const response = await axios.get("http://10.18.50.145:7800/esb/DFCC_OB_NEW/v1/OB_LOAN_details?CIF_NO=1023177", {
            headers: {
                'credentials': 'OBBANK0800/AAbank@100'
            }
        });
        res.json(response.data);
        console.log("Successfully data fetched");
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch QR data" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});