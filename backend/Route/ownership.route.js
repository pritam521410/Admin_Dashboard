import express from "express";
import {
  createOwnership,
  getAllOwnership,
  getOwnershipById,
  updateOwnership,
  deleteOwnership,
} from "../controllers/ownership.controller.js";

const router = express.Router();
router.post("/create-ownership", createOwnership);
router.post("/create-ownership", createOwnership);
router.get("/all-ownership", getAllOwnership);
router.get("/ownership/:id", getOwnershipById);
router.put("/update-ownership/:id", updateOwnership);
router.delete("/delete-ownership/:id", deleteOwnership);

export default router;
