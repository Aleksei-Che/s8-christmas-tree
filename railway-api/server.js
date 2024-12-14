import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import locationsRoutes from "./routes/locationsRoutes.js"
import treesRoutes from "./routes/treesRoutes.js";
import eventsRoutes from "./routes/eventsRoutes.js";
 
config();

const app = express();
const port = 3000;

app.use(cors());
app.use(json());

app.use("/trees", treesRoutes);
app.use("/locations", locationsRoutes)
app.use("/events", eventsRoutes);

// Пример маршрута
app.get("/", (req, res) => {
  res.send("Welcome to the Christmas Tree API!");
});
  
  // Запуск сервера
 app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  });