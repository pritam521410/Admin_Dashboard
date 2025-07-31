import express from "express";
import {
  createCourseDuration,
  getAllCourseDuration,
  updateCourseDuration,
  deleteCourseDuration,
} from "../controllers/course_duration.controller.js";

const router = express.Router();

router.post("/create-course-duration", createCourseDuration);
router.get("/all-course-duration", getAllCourseDuration);
router.put("/update-course-duration/:id", updateCourseDuration);
router.delete("/delete-course-duration/:id", deleteCourseDuration);

export default router;
