import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: String, require: true },
  offerPrice: { type: String, require: true },
  categories: { type: String, require: true },
  images: { type: Array },
});

const Product =
  mongoose.models.Product || mongoose.model("product", ProductSchema);

export default Product;
