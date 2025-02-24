const express = require("express");
const axios = require("axios");
//const route = express.Router();

// Coborrower API 
exports.getCoborrowerDetails = async (req, res) => {
    const { leadCustomer } = req.query;
    if (!leadCustomer) {
        return res.status(400).json({ error: "leadCustomer parameter is required" });
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
};

//module.exports = route;