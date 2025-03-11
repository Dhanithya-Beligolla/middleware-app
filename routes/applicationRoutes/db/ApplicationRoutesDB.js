const express = require("express");
const { getCoborrowerDetails } = require("../../../Controllers/Database/Application/CoBorrower");
const { getExposureDetails } = require("../../../Controllers/Database/Application/Exposure");
const { getGroupExposureDetails } = require("../../../Controllers/Database/Application/GoupExposure");
const { getClientDetails } = require("../../../Controllers/Database/Application/ClientDetails");
const router = express.Router();

// Application API route
router.get("/get-coborrower", getCoborrowerDetails);
router.get("/get-exposure", getExposureDetails);
router.get("/get-group-exposure", getGroupExposureDetails);
router.get("/get-client-details", getClientDetails);





module.exports = router;
// Compare this snippet from routes/applicationRoutes/apis/applicationRoutes.js:
