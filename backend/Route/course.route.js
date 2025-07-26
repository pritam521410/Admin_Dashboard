import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
const router = express.Router();

router.post("/add", upload.fields([{ name: "logo", maxCount: 1 }]), addCourse);
router.get("/all", getAllCourses);
router.get("/get", getCourseById);
router.post(
  "/update",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  updateCourse
);
router.delete("/delete", deleteCourse);
export default router;
