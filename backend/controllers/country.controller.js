import Country from "../models/Country.model.js";
import fs from "fs";

export const addCountry = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    const logoFile = req.files?.logo?.[0];
    const flagFile = req.files?.flag?.[0];

    const country = new Country({
      name,
      code,
      description,
      logo: logoFile ? `uploads/${logoFile.filename}` : null,
      flag: flagFile ? `uploads/${flagFile.filename}` : null,
    });

    await country.save();

    res.status(201).json({ message: "Country added successfully!", country });
  } catch (error) {
    console.error("Error in addCountry:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch countries" });
  }
};

export const editCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description } = req.body;
    let updateData = { name, code, description };
    // Handle file uploads if present
    if (req.files?.logo?.[0]) {
      updateData.logo = `uploads/${req.files.logo[0].filename}`;
    }
    if (req.files?.flag?.[0]) {
      updateData.flag = `uploads/${req.files.flag[0].filename}`;
    }
    const updated = await Country.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Country not found" });
    res
      .status(200)
      .json({ message: "Country updated successfully!", country: updated });
  } catch (error) {
    console.error("Error in editCountry:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Country.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Country not found" });
    res.status(200).json({ message: "Country deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteCountry:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
