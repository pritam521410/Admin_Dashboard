import express from "express";

import {
  createExamType,
  getAllExamType,
  updateExamType,
  deleteExamType,
  getExamTypeById,
} from "../controllers/examType.controller.js";

const router = express.Router();

router.post("/add-exam-type", createExamType);
router.get("/all-exam-type", getAllExamType);
router.put("/update-exam-type/:id", updateExamType);
router.delete("/delete-exam-type/:id", deleteExamType);
router.get("/get-exam-type/:id", getExamTypeById);

export default router;
