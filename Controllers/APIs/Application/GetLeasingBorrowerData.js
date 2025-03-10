const express = require("express");
const axios = require("axios");
// const route = express.Router();

baseurl = process.env.BASEURL;

// Leasing Data API 
exports.getLeasingData = async (req, res) => {
    const { clientId } = req.query;
    if (!clientId) {
        return res.status(400).json({ error: "clientId parameter is required" });
    }
    try {
        const response = await axios.get(`${baseurl}/esb/lsng/v1/getFacilityInqList?clientId=${clientId}`, {
            headers: {
                'credentials': 'OBBANK0800/AAbank@100CC'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch Leasing data" });
    }
};

