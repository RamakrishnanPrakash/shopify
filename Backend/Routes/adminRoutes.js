import express from "express";
import { addProduct } from "../Controllers/adminControllers.js";
import upload from "../multerConfig.js";

const adminRouter = express.Router();
//  /api/v0/admin
adminRouter.post("/product/add", upload.array("images", 4), addProduct);
export default adminRouter;
