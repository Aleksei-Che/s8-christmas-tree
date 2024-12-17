import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import mysql from "mysql2";
import locationsRoutes from "./routes/locationsRoutes.js";
import treesRoutes from "./routes/treesRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database!");
});

app.get("/test-db", (req, res) => {
  connection.query("SHOW DATABASES;", (err, results) => {
    if (err) {
      res.status(500).send("Error querying the database");
      return;
    }
    res.json(results);
  });
});

app.use("/trees", treesRoutes);
app.use("/locations", locationsRoutes);
app.use("/events", eventsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Christmas Tree API!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
