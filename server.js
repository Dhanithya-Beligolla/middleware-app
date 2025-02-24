require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { checkDbConnection } = require("./dbConfig/dbConfig");  //import DB configurations

//-------------------------------------
//-----------------Import Routers
//-------------------------------------

//Test
const CustomerTestRouter = require("./routes/CustomerTest");   //This is the main test you can change this anytime to test any API
const CustomerRoutes = require("./routes/customerRoutes"); // New route
const CustomerAccQR = require("./routes/CustomerAccQR");  //Slipless test route

//Application-Routers
const applicationRoutes = require("./routes/applicationRoutes/applicationRoutes");


//-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Main Application
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5693;

// Enable CORS
app.use(cors({credentials: true, origin: true}));
app.use(express.json());


//------------------------------------
// ---------------Use Routers
//------------------------------------

//Test
app.use("/api/customer" ,CustomerTestRouter);
app.use("/api/customer", CustomerRoutes); // Add new customer route
app.use("/api/searchnic", CustomerAccQR); // Add new customer route

//Application-Routers
app.use("/api/application/", applicationRoutes);





// Check database connection
checkDbConnection();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// app.get("/", (req, res) => {
//     res.send("MySQL Connection Test Successful!");
//   });