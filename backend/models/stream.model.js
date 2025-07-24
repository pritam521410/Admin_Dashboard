import mongoose from "mongoose";
const sectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
const StreamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    about: {
      type: String,
    },
    sections: [sectionSchema],
  },
  { timestamps: true }
);
export default mongoose.model("Stream", StreamSchema);
