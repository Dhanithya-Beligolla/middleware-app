//This is the main test you can change this anytime to test any API


const express = require("express");
const axios = require("axios");
const route = express.Router();


// Middleware API route
route.get("/qr", async (req, res) => {
    const { clientId } = req.query;
    if (!clientId) {
        return res.status(400).json({ error: "clientId parameter is required" });
    }

    try {
        const response = await axios.get(`http://10.18.50.145:7800/esb/customer/v1/getCustomer?clientId=${clientId}`, {
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