const express = require("express");
const { getCustomer } = require("../../apis/Application/GetCustomerRoute");
const { getCoborrowerDetails } = require("../../apis/Application/CoBorrower");
const { getLeasingData } = require("../../apis/Application/GetLeasingBorrowerData");
const router = express.Router();

// Application API route
router.get("/get-customer", getCustomer);
router.get("/get-coborrower", getCoborrowerDetails);
router.get("/get-leasing-data", getLeasingData);


module.exports = router;