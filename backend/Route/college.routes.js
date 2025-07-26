import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addCollege,
  getAllColleges,
  editCollege,
  deleteCollege,
} from "../controllers/college.controller.js";

const router = express.Router();

router.post(
  "/add-college",
  upload.fields([
    { name: "collegeLogo", maxCount: 1 },
    { name: "collegeBanner", maxCount: 1 },
    { name: "collegeBrochure", maxCount: 1 },
  ]),
  addCollege
);
router.get("/all-colleges", getAllColleges);
router.put(
  "/edit-college/:id",
  upload.fields([
    { name: "collegeLogo", maxCount: 1 },
    { name: "collegeBanner", maxCount: 1 },
    { name: "collegeBrochure", maxCount: 1 },
  ]),
  editCollege
);
router.delete("/delete-college/:id", deleteCollege);

export default router;
