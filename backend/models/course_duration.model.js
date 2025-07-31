import mongoose from "mongoose";

const courseDurationSchema = new mongoose.Schema({
  courseDuration: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const CourseDuration = mongoose.model("CourseDuration", courseDurationSchema);

export default CourseDuration;
