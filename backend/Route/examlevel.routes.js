import express from "express";
import {
  addExamLevel,
  getAllExamLevels,
  editExamLevel,
  deleteExamLevel,
} from "../controllers/examlevel.controller.js";

const router = express.Router();

router.post("/add-examlevel", addExamLevel);
router.get("/all-examlevels", getAllExamLevels);
router.put("/edit-examlevel/:id", editExamLevel);
router.delete("/delete-examlevel/:id", deleteExamLevel);

export default router;
