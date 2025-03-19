import Product from "../Models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    if (req.files.length < 4) {
      return res.status(400).json({
        success: false,
        msg: `Please uploads correct no of images`,
      });
    }
    const { title, description, categories, price, offerPrice } = req.body;
    const imageName = req.files.map((item) => item.filename);
    // console.log(imageName);
    const newProduct = new Product({
      name: title,
      description: description,
      price: price,
      offerPrice: offerPrice,
      categories: categories,
      images: imageName,
    });
    await newProduct.save();
    res.status(200).json({
      success: true,
      msg: "Data added successfully",
      newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: `Error: ${error.message}`,
    });
  }
};
