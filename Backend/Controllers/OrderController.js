import jwt, { decode } from "jsonwebtoken";
import User from "../Models/UserModel.js";
import Product from "../Models/ProductModel.js";
import OrderModel from "../Models/OrderModel.js";
import dotenv from "dotenv";
import { Stripe } from "stripe";
dotenv.config();

const FRONTEND_URL = "https://shapify-nu.vercel.app";
const BACKEND_URL = "https://shopify-two-tau.vercel.app";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
export const cod = async (req, res) => {
  try {
    const { productId, price, quantity } = req.body;
    console.log(req.body);
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, msg: "Please login" });
    const decode = await jwt.verify(
      token,
      process.env.JWT_KEY,
      async (err, decode) => {
        if (err) return res.json({ success: false, msg: "Please login" });
        return decode;
      }
    );
    const userAccount = await User.findOne({ email: decode.email });
    if (!userAccount) return res.json({ success: false, msg: "Please login" });
    const userCard = userAccount.cart.find(
      (product) =>
        product._id.toString() == productId && product.quantity == quantity
    );
    if (!userCard)
      return res.json({
        success: false,
        msg: "Please check your product card",
      });
    const product = await Product.findById(userCard.productId);
    if (!product)
      return res.json({
        success: false,
        msg: "Please check your product card",
      });
    const order = {
      userEmail: userAccount.email,
      order: [
        {
          productId: product._id,
          price: product.price,
          quantity: userCard.quantity,
          totalAmount: product.price * userCard.quantity + 123,
          paymentMethod: "cod",
          isPayment: false,
          date: new Date(),
          orderStatus: "product arrived within 5 days",
        },
      ],
    };
    const exitOrder = await OrderModel.findOne({
      userEmail: userAccount.email,
    });
    if (exitOrder) {
      exitOrder.order.push(order.order[0]);
      await exitOrder.save();
      console.log(exitOrder);
      return res.json({
        success: true,
        msg: "Order placed successfully",
        url: `${FRONTEND_URL}/csuccess`,
      });
    }
    const newOrder = new OrderModel(order);
    await newOrder.save();
    console.log(newOrder);
    return res.json({
      success: true,
      msg: "Order placed successfully",
      url: `${FRONTEND_URL}/success=true`,
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, msg: "Please login" });
    const decode = await jwt.verify(
      token,
      process.env.JWT_KEY,
      async (err, decode) => {
        if (err) res.json({ success: false, msg: "Please login" });
        return decode;
      }
    );
    const orderDetails = await OrderModel.findOne({
      userEmail: decode.email,
    }).lean();
    // console.log(orderDetails);
    if (!orderDetails) return res.json({ success: false, isEmpty: true });
    let productIdArray = orderDetails.order.map((product) => product.productId);
    const productData = await Product.find({
      _id: { $in: productIdArray },
    })
      .select("-__v")
      .lean();
    // console.log("ROUTERS:", productData);

    const order = orderDetails.order.map((order) => {
      let product = productData.find(
        (product) => order.productId == product._id
      );
      return { ...order, ...(product ? product : {}) };
    });
    res.json({ success: true, order });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, msg: error.message });
  }
};

export const checkOutSession = async (req, res) => {
  try {
    const { data } = req.body;

    // console.log(data);
    if (!data.productId.name || !data.productId.offerPrice || !data.quantity) {
      return res.status(400).json({ error: "Missing product details." });
    }

    const imageUrl =
      data.productId?.images?.length > 0
        ? `${BACKEND_URL}/uploads/${data.productId.images[0]}`
        : null; // Ensure image URL is valid

    const token = req.cookies.token;
    if (!token) return res.json({ success: false, msg: "Please login" });
    const decode = await jwt.verify(
      token,
      process.env.JWT_KEY,
      async (err, decode) => {
        if (err) res.json({ success: false, msg: "Please login" });
        return decode;
      }
    );

    const product = await Product.findById(data.productId._id);
    //check cliend side price and our backend product price
    if (Number(data.productId.offerPrice) !== Number(product.offerPrice))
      return res.json({
        success: false,
        msg: "Invalid product amount plese check your product amount",
      });
    //verify the quanity of product default 1
    Number(data.quantity) >= 1 ? "" : (data.quantity = 1);

    // console.log(Number(data.productId.offerPrice) === Number(product.offerPrice));

    const order = {
      userEmail: decode.email,
      order: [
        {
          productId: data.productId._id,
          price: data.productId.offerPrice,
          quantity: data.quantity,
          totalAmount: data.productId.offerPrice * data.quantity + 123,
          paymentMethod: "Online",
          isPayment: false,
          date: new Date(),
          orderStatus: "product arrived within 5 days",
        },
      ],
    };

    let currentOrder;
    const exitOrder = await OrderModel.findOne({
      userEmail: decode.email,
    });
    if (exitOrder) {
      exitOrder.order.push(order.order[0]);
      await exitOrder.save();
      currentOrder = exitOrder.order.pop();
      // console.log("Exiting Order:", exitOrder);
    }
    if (!exitOrder) {
      const newOrder = new OrderModel(order);
      await newOrder.save();
      currentOrder = newOrder.order.pop();
      // console.log("New Order:", newOrder);
    }
    console.log(currentOrder);

    const line_Items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: data.productId.name,
            images: [imageUrl], // Must be an array
          },
          unit_amount: Number(data.productId.offerPrice) * 100, // Price per unit in cents
        },
        quantity: Number(data.quantity),
      },
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Additional Charge",
          },
          unit_amount: 124 * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_Items, // Should be an array
      mode: "payment",
      success_url: `${FRONTEND_URL}/success?success=true&id=${currentOrder._id}`,
      cancel_url: `${FRONTEND_URL}/cancel?success=false&id=${currentOrder._id}`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

export const orderSuccess = async (req, res) => {
  try {
    const { id, success } = req.body;
    const token = req.cookies.token;
    if (!token) {
      res.json({ success: false, msg: "Plaese login your account" });
    }

    const decode = await jwt.verify(
      token,
      process.env.JWT_KEY,
      async (err, decode) => {
        if (err) res.json({ success: false, msg: err.message });
        return decode;
      }
    );
    const Order = await OrderModel.findOne({ userEmail: decode.email });
    const newO = Order.order.find((item) => item._id == id);
    newO.isPayment = true;
    await Order.save();
    res.json({ success: true, msg: "Payment get successfully" });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

export const orderCancel = async (req, res) => {
  try {
    const { id, success } = req.body;
    const token = req.cookies.token;
    const decode = await jwt.verify(
      token,
      process.env.JWT_KEY,
      async (err, decode) => {
        if (err) return res.json({ success: false, msg: err.message });
        // console.log(decode);
        return decode;
      }
    );
    let order = await OrderModel.findOne({ userEmail: decode.email });
    // console.log("Old Order:", order);
    // console.log("-------------------------------------------------------");
    order.order = order.order.find((item) => item._id.toString() !== id);
    await order.save();
    res.json({ success: true, msg: "Payment was cancelled", payment: false });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};
