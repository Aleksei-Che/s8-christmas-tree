import express, { json } from "express";
import { createConnection } from "mysql2";
import { config } from "dotenv";

config();

const app = express();
const port = 3000;


// Подключение к базе данных
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

app.use(json());

// Пример маршрута
app.get("/", (req, res) => {
  res.send("Welcome to the Christmas Tree API!");
});

app.get("/trees", (req, res) => {
    db.query("SELECT * FROM trees", (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
        return;
      }
      res.json(results);
    });
  });
  
  // Запуск сервера
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });