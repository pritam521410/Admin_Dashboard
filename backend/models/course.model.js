import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    stream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stream",
      required: true,
    },
    degree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Degree",
      required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    logo: {
      type: String,
    },
    description: {
      type: String,
    },
    admissionProcess: {
      type: String,
    },
    eligibilityCriteria: {
      type: String,
    },
    entranceExams: {
      type: String,
    },
    howToPrepare: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
