import Country from "../models/Country.model.js";
export const getCounts = async (req, res) => {
  const counts = {};
  try {
    const [countryCount] = await Promise.all([Country.countDocuments()]);
    counts.country = countryCount;
    res.status(200).json({
      success: true,
      message: "count retrieved successfully",
      data: counts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCountry = async (req, res) => {
  try {
    const country = await Country.find();
    res.status(200).json({
      success: true,
      message: "Country retrieved successfully",
      data: country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
