import District from "../models/district.model.js";
import Country from "../models/Country.model.js";
import State from "../models/state.model.js";

export const addDistrict = async (req, res) => {
  try {
    const { country, state, districtName } = req.body;
    if (!country || !state || !districtName) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const district = new District({ country, state, districtName });
    await district.save();
    res.status(201).json({ message: "District added successfully!", district });
  } catch (error) {
    console.error("Error in addDistrict:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find()
      .populate("country", "name")
      .populate("state", "name");
    res.status(200).json(districts);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch districts" });
  }
};
