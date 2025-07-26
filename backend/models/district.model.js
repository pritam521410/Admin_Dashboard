import mongoose from "mongoose";

const DistrictSchema = new mongoose.Schema(
  {
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    districtName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("District", DistrictSchema);
