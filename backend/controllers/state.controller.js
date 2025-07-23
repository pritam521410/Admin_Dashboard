import State from "../models/state.model.js";
import Country from "../models/Country.model.js";

export const addState = async (req, res) => {
  try {
    const { country, name, code, description } = req.body;
    const logoFile = req.files?.logo?.[0];
    const flagFile = req.files?.flag?.[0];

    if (!country || !name || !code || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const state = new State({
      country,
      name,
      code,
      description,
      logo: logoFile ? `uploads/${logoFile.filename}` : null,
      flag: flagFile ? `uploads/${flagFile.filename}` : null,
    });
    await state.save();
    res.status(201).json({ message: "State added successfully!", state });
  } catch (error) {
    console.error("Error in addState:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllStates = async (req, res) => {
  try {
    const states = await State.find().populate("country", "_id name");
    res.status(200).json(states);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch states" });
  }
};
