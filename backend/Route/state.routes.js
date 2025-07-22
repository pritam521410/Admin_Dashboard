import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addState, getAllStates } from "../controllers/state.controller.js";

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

export default router;
