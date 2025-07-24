import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    RankValue: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ranking", rankingSchema);
