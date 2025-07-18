import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import countryRoutes from "./Route/country.routes.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

connectDB();

app.use("/api/country", countryRoutes);

app.listen(PORT, () => {
  console.log("app is listening port 4000");
});
