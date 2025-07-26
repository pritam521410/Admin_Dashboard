import Ranking from "../models/ranking.model.js";

export const createRanking = async (req, res) => {
  try {
    const { name, RankValue } = req.body;
    const newRanking = new Ranking({ name, RankValue });
    await newRanking.save();
    res.status(201).json(newRanking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRanking = async (req, res) => {
  try {
    const rankings = await Ranking.find();
    res.status(200).json(rankings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRankingById = async (req, res) => {
  try {
    const { id } = req.params;
    const ranking = await Ranking.findById(id);
    res.status(200).json(ranking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateRanking = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, RankValue } = req.body;
    const updatedRanking = await Ranking.findByIdAndUpdate(
      id,
      { name, RankValue },
      { new: true }
    );
    res.status(200).json(updatedRanking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRanking = async (req, res) => {
  try {
    const { id } = req.params;
    await Ranking.findByIdAndDelete(id);
    res.status(200).json({ message: "Ranking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
