import mongoose from "mongoose";

const examTypeSchema = new mongoose.Schema({
  examTypeName: {
    shortName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model("ExamType", examTypeSchema);
