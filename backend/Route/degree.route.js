import express from "express";
import {
  addDegree,
  getAllDegrees,
  updateDegree,
  deleteDegree,
} from "../controllers/degree.controller.js";
const router = express.Router();

router.post("/add", addDegree);
router.get("/all", getAllDegrees);
router.put("/update", updateDegree);
router.delete("/delete", deleteDegree);
export default router;
