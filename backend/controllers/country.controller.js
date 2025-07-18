import Country from "../models/Country.model.js";

import fs from "fs";

export const addCountry = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    const files = req.files;

    const country = new Country({
      name,
      code,
      description,
      logo: files?.logo?.[0]?.filename || "",
      banner: files?.banner?.[0]?.filename || "",
      map: files?.map?.[0]?.filename || "",
      flag: files?.flag?.[0]?.filename || "",
    });

    await country.save();
    res.status(201).json({ success: true, data: country });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
