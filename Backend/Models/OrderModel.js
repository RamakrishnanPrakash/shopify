import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  order: [
    {
      productId: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      totalAmount: { type: Number, required: true },
      paymentMethod: { type: String, required: true },
      isPayment: { type: Boolean, required: true, default: false },
      date: { type: Date, required: true, default: Date.now },
      orderStatus: { type: String, required: true },
    },
  ],
});

const OrderModel =
  mongoose.models.OrderModel || mongoose.model("OrderModel", orderSchema);
export default OrderModel;
