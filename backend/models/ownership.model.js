import mongoose from "mongoose";

const ownershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ownership", ownershipSchema);
