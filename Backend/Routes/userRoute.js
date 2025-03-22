import express from "express";
import {
  addAddress,
  cardItem,
  exitEmail,
  getUserDetails,
  login,
  logout,
  register,
  removeItem,
  updateCardItem,
  updateItem,
} from "../Controllers/userController.js";
import { sentOtp, verifyOtp } from "../Middleware/userMiddleware.js";

const userRouter = express.Router();
userRouter.get("/get", getUserDetails);
userRouter.post("/logout", logout);
userRouter.post("/new", sentOtp);
userRouter.post("/verify/user", verifyOtp, register);
userRouter.post("/login", login);
userRouter.patch("/card/:cardId", updateCardItem);
userRouter.get("/all/card", cardItem);
userRouter.delete("/cart/:id", removeItem);
userRouter.put("/update/card", updateItem);
userRouter.post("/add/address", addAddress);

export default userRouter;
