import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import AffiliateStat from "../models/AffiliateStat.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    // const user = await User.findById(id);

    // const affiliateStats = await AffiliateStat.find({
    //   userId: new mongoose.Types.ObjectId(id),
    // });

    // res.status(201).json({ user: user, affiliateStats: affiliateStats });

    let userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    /* Alternate Method 
    userWithStats = await Transaction.populate(userWithStats, {
      path: "affiliateStats.affiliateSales",
    });
    */

    const saleTransaction = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredTransaction = saleTransaction.filter(
      (transaction) => transaction !== null
    );

    res.json({ user: userWithStats, sales: filteredTransaction });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
