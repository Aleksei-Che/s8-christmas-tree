import express from "express";
import { createConnection } from "mysql2";
import { config } from "dotenv";

config();

const router = express.Router();

// Подключение к базе данных
const db = createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

// Маршрут для получения всех событий
router.get("/", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      res.status(500).send("Error fetching events");
      return;
    }
    res.json(results);
  });
});

// Маршрут для добавления нового события
router.post("/", (req, res) => {
  const { title, date } = req.body;

  if (!title || !date) {
    return res.status(400).send("Title and date are required");
  }

  const query = "INSERT INTO events (title, date) VALUES (?, ?)";
  db.query(query, [title, date], (err) => {
    if (err) {
      console.error("Error adding event:", err);
      res.status(500).send("Error adding event");
      return;
    }
    res.status(201).send("Event added successfully");
  });
});

// Маршрут для удаления события
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM events WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting event:", err);
      res.status(500).send("Error deleting event");
      return;
    }
    res.status(200).send("Event deleted successfully");
  });
});

export default router;
