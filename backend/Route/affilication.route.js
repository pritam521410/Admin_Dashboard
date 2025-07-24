import express from "express";
import {
  createAffliciation,
  getAllAffliciation,
  updateAffliciation,
  deleteAffliciation,
} from "../controllers/affilicaition.controller.js";
const router = express.Router();

router.post("/add-affilication", createAffliciation);
router.get("/all-affilication", getAllAffliciation);
router.put("/update-affilication/:id", updateAffliciation);
router.delete("/delete-affilication/:id", deleteAffliciation);

export default router;
