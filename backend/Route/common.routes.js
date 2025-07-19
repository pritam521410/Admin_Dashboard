import express from "express";
import { getCounts } from "../controllers/common.controller.js";

const router = express.Router();

router.get("/get-counts", getCounts);

export default router;
