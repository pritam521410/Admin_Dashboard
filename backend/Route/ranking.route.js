import express from "express";
import {
  createRanking,
  getAllRanking,
  getRankingById,
  updateRanking,
  deleteRanking,
} from "../controllers/ranking.controller.js";

const router = express.Router();

router.post("/create-ranking", createRanking);
router.get("/all-ranking", getAllRanking);
router.get("/ranking/:id", getRankingById);
router.put("/update-ranking/:id", updateRanking);
router.delete("/delete-ranking/:id", deleteRanking);

export default router;
