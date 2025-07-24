import mongoose from "mongoose";

const collegeFacilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CollegeFacility", collegeFacilitySchema);
