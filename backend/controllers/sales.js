import OverAllStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    const OverallStat = await OverAllStat.find();
    res.status(201).json(OverallStat[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
