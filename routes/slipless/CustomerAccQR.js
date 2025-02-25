const express = require("express");
const axios = require("axios");
const route = express.Router();


// Middleware API route
route.get("/fetchcustomer", async (req, res) => {
    const { PP_NIC_BRN } = req.query;
    // if (!PP_NIC_BRN) {
    //     return res.status(400).json({ error: "CIF_NO parameter is required" });
    // }

    // try {
    //     const response = await axios.get(`http://10.18.50.145:7800/esb/DFCC_OB_NEW/v1/OB_CUST_view?PP_NIC_BRN=${PP_NIC_BRN}`, {
    //         headers: {
    //             'credentials': 'OBBANK0800/AAbank@100'
    //         }
    //     });
    //     res.json(response.data);

    // } catch (error) {
    //     console.error("Error fetching data:", error.message);
    //     res.status(500).json({ error: "Failed to fetch QR data" });
    // }

    async function fetchAdditionalData(clientIds) {
        try {
            const promises = clientIds.map(clientId => 
                axios.get(`http://10.18.50.145:7800/esb/DFCC_OB_NEW/v1/OB_AC_view?clientId=${clientId}`, {
                    headers: {
                        'credentials': 'OBBANK0800/AAbank@100'
                    }
                })
            );
            const responses = await Promise.all(promises);
            return responses.map(response => response.data);
        } catch (error) {
            console.error("Error fetching additional data:", error.message);
            throw new Error("Failed to fetch additional data");
        }
    }

    if (!PP_NIC_BRN) {
        return res.status(400).json({ error: "PP_NIC_BRN parameter is required" });
    }
    
    try {
        const response = await axios.get(`http://10.18.50.145:7800/esb/DFCC_OB_NEW/v1/OB_CUST_view?PP_NIC_BRN=${PP_NIC_BRN}`, {
            headers: {
                'credentials': 'OBBANK0800/AAbank@100'
            }
        });

        console.log(response.data); // Log the response data

        if (!Array.isArray(response.data)) {
            throw new Error("Unexpected response format");
        }
    
        const clientIds = response.data.map(item => item.clientId);
        const additionalData = await fetchAdditionalData(clientIds);
        res.json(additionalData);

    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch Client ID data" });
    }
});
































// const { clientID } = req.query;

//         clientID = clientIds[0].clientId;

//         console.log(clientID);

//         if (!clientID) {
//             return res.status(400).json({ error: "CIF_NO parameter is required" });
//         }

//         try {
//             const response = await axios.get(`http://10.18.50.145:7800/esb/DFCC_OB_NEW/v1/OB_AC_view?clientId=${clientID}`, {
//                 headers: {
//                     'credentials': 'OBBANK0800/AAbank@100'
//                 }
//             });
//             res.json(response.data);
            
//         } catch (error) {
//             console.error("Error fetching data:", error.message);
//             res.status(500).json({ error: "Failed to fetch Clients ACC data" });  
//         }



module.exports = route;


