import ApprovedThrough from "../models/approvesThrough.model.js";

export const createApprovedThrough = async (req, res) => {
  try {
    const { approvesThroughName } = req.body;
    const newApprovedThrough = new ApprovedThrough({ approvesThroughName });
    await newApprovedThrough.save();
    res.status(201).json(newApprovedThrough);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllApprovedThrough = async (req, res) => {
  try {
    const approvedThrough = await ApprovedThrough.find();
    res.status(200).json(approvedThrough);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApprovedThrough = async (req, res) => {
  try {
    const { id } = req.params;
    const { approvesThroughName } = req.body;
    const updatedApprovedThrough = await ApprovedThrough.findByIdAndUpdate(
      id,
      { approvesThroughName },
      { new: true }
    );
    res.status(200).json(updatedApprovedThrough);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteApprovedThrough = async (req, res) => {
  try {
    const { id } = req.params;
    await ApprovedThrough.findByIdAndDelete(id);
    res.status(200).json({ message: "Approved Through deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getApprovedThroughById = async (req, res) => {
  try {
    const { id } = req.params;
    const approvedThrough = await ApprovedThrough.findById(id);
    res.status(200).json(approvedThrough);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
