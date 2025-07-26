import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addState,
  getAllStates,
  editState,
  deleteState,
} from "../controllers/state.controller.js";

const router = express.Router();

// Get all states
router.get("/all-states", getAllStates);

// Add state (with file upload)
router.post(
  "/add-state",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "flag", maxCount: 1 },
  ]),
  addState
);

router.put(
  "/edit-state/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "flag", maxCount: 1 },
  ]),
  editState
);

router.delete("/delete-state/:id", deleteState);

export default router;
