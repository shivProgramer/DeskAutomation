
const express = require("express");
const app = express();
const port = 3333;
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const config = {
  user: "sa",
  password: "abc@123",
  server: "localhost",
  database: "DeskAutomation",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Function to connect and fetch data
async function fetchData() {
  try {
    console.log("Attempting to connect to SQL Server...");
    let pool = await sql.connect(config);
    console.log("Connected to SQL Server successfully.");

    const result = await pool
      .request()
      .query("SELECT TOP 10 * FROM Admin_Users");
    console.log("Query result:", result.recordset);

    await pool.close();
  } catch (err) {
    console.error("SQL error:", err.message);
    console.error(err);
  }
}

// Execute fetch function
fetchData();

app.get("/tester", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
