import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    stream: { type: String, required: true },
    course: { type: String },
    examName: { type: String, required: true },
    title: { type: String },
    displayRank: { type: Number, default: 0 },
    noOfApplication: { type: String },
    purpose: { type: String },
    applicationFee: { type: Number, default: 0 },
    applicationDate: { type: Date },
    examDate: { type: Date },
    resultDate: { type: Date },
    examLevel: { type: String, required: true },
    examType: { type: String },
    state: { type: String, required: true },
    logo: { type: String },
    pdf: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Exam", ExamSchema);
