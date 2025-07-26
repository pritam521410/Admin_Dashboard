import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addExam,
  getAllExams,
  editExam,
  deleteExam,
} from "../controllers/exam.controller.js";

const router = express.Router();

router.post(
  "/add-exam",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  addExam
);
router.get("/all-exams", getAllExams);
router.put(
  "/edit-exam/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  editExam
);
router.delete("/delete-exam/:id", deleteExam);

export default router;
