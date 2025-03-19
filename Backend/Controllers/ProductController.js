import Product from "../Models/ProductModel.js";

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({
      success: true,
      msg: "product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.json({ success: false, msg: "No product" });
    const product = await Product.findById(id);
    if (product === null)
      return res.json({ success: false, msg: "No product" });
    return res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
