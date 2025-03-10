require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { checkDbConnection } = require("./dbConfig/dbConfig");  //import DB configurations

//-------------------------------------
//-----------------Import Routers
//-------------------------------------

//Test
const CustomerTestRouter = require("./routes/testRouts/testUsingAPI/CustomerTest");   //This is the main test you can change this anytime to test any API
const CustomerRoutes = require("./routes/testRouts/testUsingDB/customerRoutes"); // New route
const CustomerAccQR = require("./routes/slipless/CustomerAccQR");  //Slipless test route

//Application-Routers
const applicationRoutes = require("./routes/applicationRoutes/apis/applicationRoutes");
const applicationRoutesDB = require("./routes/applicationRoutes/db/ApplicationRoutesDB");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Application
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT;

// Enable CORS
app.use(cors({credentials: true, origin: true}));
app.use(express.json());

//------------------------------------
// ---------------Use Routers
//------------------------------------

//Test
app.use("/api/customer" ,CustomerTestRouter);
app.use("/api/customerdb", CustomerRoutes); // Add new customer route
app.use("/api/searchnic", CustomerAccQR); // Add new customer route

//Application-Routers
app.use("/api/application/", applicationRoutes);
app.use("/db/application/", applicationRoutesDB);





// Check database connection
checkDbConnection();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// app.get("/", (req, res) => {
//     res.send("MySQL Connection Test Successful!");
//   });