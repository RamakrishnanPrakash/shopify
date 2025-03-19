import express from "express";
import {
  checkOutSession,
  cod,
  getOrderDetails,
  orderCancel,
  orderSuccess,
} from "../Controllers/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/cod", cod);
OrderRouter.get("/user", getOrderDetails);
OrderRouter.post("/payment/check-out-session", checkOutSession);
OrderRouter.post("/payment/success", orderSuccess);
OrderRouter.post("/payment/cancel", orderCancel);

export default OrderRouter;
