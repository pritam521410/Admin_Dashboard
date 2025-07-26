import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    collegeLogo: { type: String },
    collegeBanner: { type: String },
    collegeBrochure: { type: String },
    sectionTitle: { type: String },
    // Add more fields as needed
  },
  { timestamps: true }
);

export default mongoose.model("College", CollegeSchema);
