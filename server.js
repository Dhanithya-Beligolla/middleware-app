require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { checkDbConnection } = require("./dbConfig/dbConfig");

// Check database connection
checkDbConnection();


//Routers
const CustomerTestRouter = require("./routes/CustomerTest");
const CoBorrowerRouter = require("./routes/CoBorrower");
const CustomerRoutes = require("./routes/customerRoutes"); // New route
const CustomerAccQR = require("./routes/CustomerAccQR");  //Slipless test route


const app = express();
const PORT = process.env.PORT || 5693;

// Enable CORS
app.use(cors({credentials: true, origin: true}));
app.use(express.json());



// Use Routers
app.use("/api/customer" ,CustomerTestRouter);
app.use("/api/coborrower", CoBorrowerRouter);
app.use("/api/customer", CustomerRoutes); // Add new customer route
app.use("/api/searchnic", CustomerAccQR); // Add new customer route




// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// app.get("/", (req, res) => {
//     res.send("MySQL Connection Test Successful!");
//   });