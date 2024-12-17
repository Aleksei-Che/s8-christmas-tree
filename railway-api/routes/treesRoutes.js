import express from "express";
import { createConnection } from "mysql2";
import { config } from "dotenv";

config();

const router = express.Router();

const db = createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
  });

  db.connect((err) => {
    if (err) {
      console.error("Failed to connect to the database:", err);
      return;
    }
    console.log("Successfully connected to the MySQL database on Railway!");
  });
  
  router.get("/", (req, res) => {
    db.query("SELECT * FROM trees", (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
        return;
      }
      res.json(results);
    });
  });
  
  router.post("/", (req, res) => {
    const { name, height, ornaments_count, ornaments_color } = req.body;
    const query = "INSERT INTO trees (name, height, ornaments_count, ornaments_color) VALUES (?, ?, ?, ?)";
    const values = [name, height, ornaments_count, ornaments_color];
  
    if (!name || !height || !ornaments_count || !ornaments_color) {
      return res.status(400).send("All fields are required");
    }
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error inserting data");
        return;
      }
      res.status(201).send("Tree added successfully!");
    });
  });
  
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, height, ornaments_count, ornaments_color } = req.body;
  
    if (!name || !height || !ornaments_count || !ornaments_color) {
      return res.status(400).send("All fields are required");
    }
  
    const query = `
      UPDATE trees 
      SET name = ?, height = ?, ornaments_count = ?, ornaments_color = ?
      WHERE id = ?
    `;
    const values = [name, height, ornaments_count, ornaments_color, id];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error updating data:", err);
        return res.status(500).json({ message: "Error updating tree", error: err });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Tree not found" });
      }
  
      res.status(200).json({
        id: Number(id),
        name,
        height,
        ornaments_count,
        ornaments_color,
      });
    });
  });
  
  export default router;