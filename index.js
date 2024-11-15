// require("dotenv").config(); // Load environment variables from .env file
// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3333; // Use the port from .env or default to 3333
// const cors = require("cors");
// const bodyParser = require("body-parser");

// // Import Sequelize connection from db.js
// const sequelize = require("./db");
// const AdminUser = require("./models/adminUser"); // Import the model

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // Define a simple test route
// app.get("/tester", (req, res) => {
//   res.send("Hello World!");
// });

// // Fetch data using Sequelize Model
// app.get("/fetch-data", async (req, res) => {
//   try {
//     const users = await AdminUser.findAll();
//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     res.status(500).json({ error: "An error occurred while fetching data." });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });



require("dotenv").config(); 
const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db"); 
const adminUserRoutes = require("./routes/adminUserRoutes"); 
const projectCostRoutes = require('./routes/project_cost');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//adminUserRoutes ----
app.use("/api/admin-users", adminUserRoutes);
// project_const -----
app.use("/api", projectCostRoutes);

// Define a simple test route
app.get("/tester", (req, res) => {
  res.send("Hello World!");
});
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => {
  console.error("Database sync error:", err);
});