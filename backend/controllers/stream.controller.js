import Stream from "../models/stream.model.js";

export const addStream = async (req, res) => {
  try {
    const { name, about, section_title, section_description } = req.body;
    const logoFile = req.files?.logo?.[0];

    // Build sections array from titles and descriptions
    const sections = [];
    if (Array.isArray(section_title) && Array.isArray(section_description)) {
      for (let i = 0; i < section_title.length; i++) {
        sections.push({
          title: section_title[i],
          description: section_description[i],
        });
      }
    } else if (section_title && section_description) {
      // Handle single section (not array)
      sections.push({
        title: section_title,
        description: section_description,
      });
    }

    const stream = new Stream({
      name,
      logo: logoFile ? `uploads/${logoFile.filename}` : null,
      about,
      sections,
    });
    await stream.save();
    res.status(201).json({
      success: true,
      message: "Stream added successfully",
      data: stream,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const getAllStreams = async (req, res) => {
  try {
    const streams = await Stream.find();
    res.json({ success: true, data: streams });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch streams",
      error: error.message,
    });
  }
};
