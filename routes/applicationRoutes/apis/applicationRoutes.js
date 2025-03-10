const express = require("express");
const { getCustomer } = require("../../../Controllers/APIs/Application/GetCustomerRoute");
const { getCoborrowerDetails } = require("../../../Controllers/APIs/Application/CoBorrower");
const { getLeasingData } = require("../../../Controllers/APIs/Application/GetLeasingBorrowerData");
const router = express.Router();

// Application API route
router.get("/get-customer", getCustomer);
router.get("/get-coborrower", getCoborrowerDetails);
router.get("/get-leasing-data", getLeasingData);


module.exports = router;