import express from "express";
import {
  addDistrict,
  getAllDistricts,
} from "../controllers/district.controller.js";

const router = express.Router();

// Add district
router.post("/add-district", addDistrict);

// Get all districts
router.get("/all-districts", getAllDistricts);

export default router;
