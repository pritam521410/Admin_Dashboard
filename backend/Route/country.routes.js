import express from "express";
import multer from "multer";

import { addCountry } from "../controllers/country.controller.js";

const router = express.Router();

router.post("/add-country", addCountry);

export default router;
