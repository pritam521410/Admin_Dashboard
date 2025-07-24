import express from "express";
import {
  createCourseDuration,
  getALlCourseDuration,
  updateCourseDuration,
  deleteCourseDuration,
} from "../controllers/course_duraton.controller.js";

const router = express.Router();

router.post("/add-course-duration", createCourseDuration);
router.get("/all-course-duration", getALlCourseDuration);
router.put("/update-course-duration/:id", updateCourseDuration);
router.delete("/delete-course-duration/:id", deleteCourseDuration);

export default router;
