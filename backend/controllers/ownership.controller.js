import Ownership from "../models/ownership.model.js";

export const createOwnership = async (req, res) => {
  try {
    const { name } = req.body;
    const newOwnership = new Ownership({ name });
    await newOwnership.save();
    res.status(201).json(newOwnership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOwnership = async (req, res) => {
  try {
    const ownership = await Ownership.find();
    res.status(200).json(ownership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOwnershipById = async (req, res) => {
  try {
    const { id } = req.params;
    const ownership = await Ownership.findById(id);
    res.status(200).json(ownership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOwnership = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedOwnership = await Ownership.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(updatedOwnership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOwnership = async (req, res) => {
  try {
    const { id } = req.params;
    await Ownership.findByIdAndDelete(id);
    res.status(200).json({ message: "Ownership deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
