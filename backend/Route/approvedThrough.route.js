import express from "express";
import {
  createApprovedThrough,
  getAllApprovedThrough,
  updateApprovedThrough,
  deleteApprovedThrough,
  getApprovedThroughById,
} from "../controllers/approvedThrough.controller.js";

const router = express.Router();

router.post("/add-approved-through", createApprovedThrough);
router.get("/all-approved-through", getAllApprovedThrough);
router.put("/update-approved-through/:id", updateApprovedThrough);
router.delete("/delete-approved-through/:id", deleteApprovedThrough);
router.get("/get-approved-through/:id", getApprovedThroughById);

export default router;
