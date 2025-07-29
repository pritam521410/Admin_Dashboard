import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  try {
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://localhost:27017/bams-admission";
    await mongoose.connect(mongoUrl);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
