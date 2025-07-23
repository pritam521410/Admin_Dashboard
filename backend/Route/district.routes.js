import express from "express";
import {
  addDistrict,
  getAllDistricts,
  editDistrict,
  deleteDistrict,
} from "../controllers/district.controller.js";

const router = express.Router();

// Add district
router.post("/add-district", addDistrict);

// Get all districts
router.get("/all-districts", getAllDistricts);

router.put("/edit-district/:id", editDistrict);
router.delete("/delete-district/:id", deleteDistrict);

export default router;
