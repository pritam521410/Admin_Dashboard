import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import { connectDB } from "./db.js";
import countryRoutes from "./Route/country.routes.js";
import commonRoutes from "./Route/common.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

// ✅ Connect to DB
connectDB();

// ✅ Middlewares
app.use(express.json());
app.use(cors()); // temporary for local

app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup (Correct key: credentials with small "c")
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost"],
    credentials: true,
  })
);

// ✅ Serve static files (like uploaded images)
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ✅ Create upload instance
export const upload = multer({ storage });

// ✅ Routes
app.use("/api/country", countryRoutes); // This will handle form submission
app.use("/api/", commonRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
