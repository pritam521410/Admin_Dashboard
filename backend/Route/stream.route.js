import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addStream, getAllStreams } from "../controllers/stream.controller.js";
const router = express.Router();

router.post(
  "/add-stream",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  addStream
);
router.get("/all", getAllStreams);
export default router;
