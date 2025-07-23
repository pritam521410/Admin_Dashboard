import Country from "../models/Country.model.js";
import State from "../models/state.model.js";
import District from "../models/district.model.js";
export const getCounts = async (req, res) => {
  const counts = {};
  try {
    const [countryCount, stateCount, districtCount] = await Promise.all([
      Country.countDocuments(),
      State.countDocuments(),
      District.countDocuments(),
    ]);
    counts.country = countryCount;
    counts.state = stateCount;
    counts.district = districtCount;
    res.status(200).json({
      success: true,
      message: "count retrieved successfully",
      data: {
        countryCount,
        stateCount,
        districtCount,
      },
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
