import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import { connectDB } from "./db.js";
import countryRoutes from "./Route/country.routes.js";
import commonRoutes from "./Route/common.routes.js";
import stateRoutes from "./Route/state.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

app.use("/api/country", countryRoutes);
app.use("/api/", commonRoutes);
app.use("/api/state", stateRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
