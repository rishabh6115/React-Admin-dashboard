import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();

    const productWithStat = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(201).json(productWithStat);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
