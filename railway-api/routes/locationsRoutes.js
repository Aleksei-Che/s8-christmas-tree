import express from "express";
import { createConnection } from "mysql2";
import { config } from "dotenv";

config ();

const router = express.Router();

const db = createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
});

router.get("/", (req, res) => {
    db.query("SELECT * FROM locations", (err, results) => {
        if (err) {
            console.error("Error fetching locations:", err);
            res.status(500).send("Error fetching locations");
            return;
        }
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { name, latitude, longitude } = req.body;

    if (!name || !latitude || !longitude) {
        return res.status(400).send("All fields are required");
    }

    const query = "INSERT INTO locations (name, latitude, longitude) VALUES (?, ?, ?)";
    const values = [name, latitude, longitude];

    db.query(query, values, (err) => {
        if (err) {
            console.error("Error adding location:", err);
            res.status(500).send("Error adding location");
            return;
        }
        res.status(201).send("Location added successfully!");
    });
});

// Маршрут для удаления локации
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM locations WHERE id = ?", [id], (err) => {
        if (err) {
            console.error("Error deleting location:", err);
            res.status(500).send("Error deleting location");
            return;
        }
        res.status(200).send("Location deleted successfully!");
    });
});

export default router;
