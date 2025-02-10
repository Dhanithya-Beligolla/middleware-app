// dbConfig.js
const mysql = require("mysql2");

// Database configuration
const dbConfig = {
  host: "10.18.50.16",
  user: "root",
  password: "Dfcc@1234", // Add your password
  database: "dfcc_fos_v2_master",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to check database connection
const checkDbConnection = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err.message);
      return;
    }
    console.log("Connected to MySQL database successfully!");
    connection.release(); // Release the connection
  });
};

module.exports = { pool, checkDbConnection };
