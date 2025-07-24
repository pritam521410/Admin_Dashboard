import mongoose from "mongoose";
const degreeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Degree", degreeSchema);
