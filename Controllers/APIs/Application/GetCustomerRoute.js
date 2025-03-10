const express = require("express");
const axios = require("axios");
// const route = express.Router();

baseurl = process.env.BASEURL;

// Customer API 
exports.getCustomer = async (req, res) => {
    const { clientId } = req.query;
    if (!clientId) {
        return res.status(400).json({ error: "clientId parameter is required" });
    }
    try {
        const response = await axios.get(`${baseurl}/esb/customer/v1/getCustomer?clientId=${clientId}`, {
            headers: {
                'credentials': 'OBBANK0800/AAbank@100CC'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch Customer data" });
    }
};

//module.exports = route;