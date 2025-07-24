import Degree from "../models/degree.model.js";

export const addDegree = async (req, res) => {
  try {
    const { name } = req.body;
    const degree = new Degree({
      name,
    });
    await degree.save();
    return res.status(201).json({ messsage: "Degree added successfully!!" });
  } catch (error) {
    return res
      .status(500)
      .json({ messsage: "Internal server error", error: error.message });
  }
};

export const getAllDegrees = async (req, res) => {
  try {
    const degrees = await Degree.find();
    return res.status(200).json({ degrees });
  } catch (error) {
    return res
      .status(500)
      .json({ messsage: "Internal server error", error: error.message });
  }
};

export const updateDegree = async (req, res) => {
  try {
    const { _id } = req.query;
    const { name } = req.body;
    const degree = await Degree.findByIdAndUpdate(_id, { name }, { new: true });
    return res.status(200).json({ message: "Degree updated successfully!!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteDegree = async (req, res) => {
  try {
    const { _id } = req.query;
    const degree = await Degree.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Degree deleted successfully!!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
