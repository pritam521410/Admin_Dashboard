import College from "../models/College.model.js";

export const addCollege = async (req, res) => {
  try {
    const { sectionTitle } = req.body;
    const logoFile = req.files?.collegeLogo?.[0];
    const bannerFile = req.files?.collegeBanner?.[0];
    const brochureFile = req.files?.collegeBrochure?.[0];
    const college = new College({
      sectionTitle,
      collegeLogo: logoFile ? `uploads/${logoFile.filename}` : undefined,
      collegeBanner: bannerFile ? `uploads/${bannerFile.filename}` : undefined,
      collegeBrochure: brochureFile
        ? `uploads/${brochureFile.filename}`
        : undefined,
    });
    await college.save();
    res.status(201).json({ message: "College added successfully!", college });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch colleges" });
  }
};

export const editCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.files?.collegeLogo?.[0]) {
      updateData.collegeLogo = `uploads/${req.files.collegeLogo[0].filename}`;
    }
    if (req.files?.collegeBanner?.[0]) {
      updateData.collegeBanner = `uploads/${req.files.collegeBanner[0].filename}`;
    }
    if (req.files?.collegeBrochure?.[0]) {
      updateData.collegeBrochure = `uploads/${req.files.collegeBrochure[0].filename}`;
    }
    const updated = await College.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "College not found" });
    res.status(200).json({ message: "College updated!", college: updated });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await College.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "College not found" });
    res.status(200).json({ message: "College deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
