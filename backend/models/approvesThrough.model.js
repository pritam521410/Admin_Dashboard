import mongoose from "mongoose";

const approvesThroughSchema = new mongoose.Schema({
  approvesThroughName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ApprovedThrough", approvesThroughSchema);
