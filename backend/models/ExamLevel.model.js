import mongoose from "mongoose";

const ExamLevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExamLevel", ExamLevelSchema);
