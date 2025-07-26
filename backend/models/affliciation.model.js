import mongoose from "mongoose";

const affliciationSchema = new mongoose.Schema({
  affliciationName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Affliciation", affliciationSchema);
