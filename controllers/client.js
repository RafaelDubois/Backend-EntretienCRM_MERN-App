import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).send(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


