import Affliciation from "../models/affliciation.model.js";

export const createAffliciation = async (req, res) => {
  try {
    const { affliciationName } = req.body;
    const newAffliciation = new Affliciation({ affliciationName });
    await newAffliciation.save();
    res.status(201).json(newAffliciation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAffliciation = async (req, res) => {
  try {
    const affliciation = await Affliciation.find();
    res.status(200).json(affliciation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAffliciation = async (req, res) => {
  try {
    const { id } = req.params;
    const { affliciationName } = req.body;
    const updatedAffliciation = await Affliciation.findByIdAndUpdate(
      id,
      { affliciationName },
      { new: true }
    );
    if (!updatedAffliciation) {
      return res.status(404).json({ message: "Affiliation not found" });
    }
    res.status(200).json(updatedAffliciation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAffliciation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAffliciation = await Affliciation.findByIdAndDelete(id);
    if (!deletedAffliciation) {
      return res.status(404).json({ message: "Affiliation not found" });
    }
    res.status(200).json({ message: "Affiliation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
