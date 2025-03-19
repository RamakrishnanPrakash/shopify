import express from "express";
import { getOneProduct, getProduct } from "../Controllers/ProductController.js";

const productRoute = express.Router();

productRoute.get("/product/all", getProduct);
productRoute.get("/product/:id", getOneProduct);

export default productRoute;
