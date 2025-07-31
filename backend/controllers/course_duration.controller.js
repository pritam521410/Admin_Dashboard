import CourseDuration from "../models/course_duration.model.js";

export const createCourseDuration = async (req, res) => {
  try {
    const { courseDuration } = req.body;
    const newCourseDuration = new CourseDuration({ courseDuration });
    await newCourseDuration.save();
    res.status(201).json(newCourseDuration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCourseDuration = async (req, res) => {
  try {
    const courseDuration = await CourseDuration.find().sort({ createdAt: -1 });
    res.status(200).json(courseDuration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourseDuration = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseDuration } = req.body;
    const updatedCourseDuration = await CourseDuration.findByIdAndUpdate(
      id,
      { courseDuration },
      { new: true }
    );
    res.status(200).json(updatedCourseDuration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourseDuration = async (req, res) => {
  try {
    const { id } = req.params;
    await CourseDuration.findByIdAndDelete(id);
    res.status(200).json({ message: "Course duration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
