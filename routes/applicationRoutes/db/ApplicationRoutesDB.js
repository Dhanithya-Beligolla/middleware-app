const express = require("express");
const { getCoborrowerDetails } = require("../../../Controllers/Database/Application/CoBorrower");
const router = express.Router();

// Application API route
router.get("/get-coborrower", getCoborrowerDetails);



module.exports = router;
// Compare this snippet from routes/applicationRoutes/apis/applicationRoutes.js:
