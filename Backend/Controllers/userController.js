import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Product from "../Models/ProductModel.js";

export const exitEmail = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const isEmail = await User.find({ email: email });
  if (isEmail.length > 0)
    return res
      .status(400)
      .json({ success: false, msg: "Email address already taken" });
  return res
    .status(200)
    .json({ success: true, sendOtp: true, msg: "Email Address not found" });
};

export const register = async (req, res) => {
  try {
    if (!req.validUser) {
      return res.json({
        success: false,
        msg: "Invalid user",
      });
    }
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashPassword,
      image: "",
      createAt: Date.now(),
    });
    await newUser.save();
    const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        msg: "Registration successful",
      });
  } catch (error) {}
};

export const getUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, loggedIn: false });

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
      if (err) return res.json({ success: false, loggedIn: false });
      const user = await User.findOne({ email: decode.email }).select(
        "-password -_id"
      );
      // console.log(user);
      res.status(200).json({ success: true, loggedIn: true, user });
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      msg: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email && !password)
      return res.json({ success: false, msg: "Please enter email & password" });
    const isEmail = await User.findOne({ email });

    if (isEmail === null)
      return res.json({ success: false, msg: "Please enter valid email" });
    const credentials = await bcrypt.compare(password, isEmail.password);

    if (!credentials)
      return res.json({ success: false, msg: "Please enter valid password" });
    const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        msg: "Login successfull, welcome back shopify",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res
      .cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0),
      })
      .json({ success: true, msg: "Logout" });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const updateCardItem = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { email } = req.body;

    // console.log("Card ID:", cardId);

    const userAccount = await User.findOne({ email: email });

    if (!userAccount) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Convert cardId to ObjectId for comparison

    const cartIndex = userAccount.cart.findIndex(
      (item) => item.productId.toString() === cardId
    );

    // console.log(new mongoose.Types.ObjectId(cardId));

    if (cartIndex == -1) {
      userAccount.cart.push({
        productId: new mongoose.Types.ObjectId(cardId),
      });
      await userAccount.save();
      return res.json({
        success: true,
        cart: userAccount.cart,
      });
    }
    // console.log(userAccount);

    userAccount.cart[cartIndex].quantity += 1;
    await userAccount.save();
    // console.log(userAccount);
    return res.json({
      success: true,
      cart: userAccount.cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export const cardItem = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ success: false, loggedIn: false });
  jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
    if (err) return res.json({ success: false, loggedIn: false });
    const cart = await User.find({ email: decode.email }).populate(
      "cart.productId"
    );
    const carts = cart[0].cart;
    res.json({ success: true, carts });
  });
};

export const removeItem = async (req, res) => {
  try {
    const token = req.cookies.token;
    const { id } = req.params; // This is the productId as a string

    if (!token) return res.json({ success: false, loggedIn: false });

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
      if (err) return res.json({ success: false, loggedIn: false });

      const userAccount = await User.findOneAndUpdate(
        { email: decode.email },
        { $pull: { cart: { _id: new mongoose.Types.ObjectId(id) } } }, // Convert id to ObjectId
        { new: true }
      ).populate("cart.productId");

      if (!userAccount) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }

      // console.log(userAccount);

      const carts = userAccount.cart;

      res.json({ success: true, carts });
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    // console.log("Card data", id, quantity);
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, loggedIn: false });

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
      if (err) return res.json({ success: false, loggedIn: false });

      const userAccount = await User.findOne({ email: decode.email });

      const index = userAccount.cart.findIndex(
        (item) => item._id == req.body.id
      );

      userAccount.cart[index].quantity = req.body.quantity;
      await userAccount.save();

      res.json({ success: true, msg: "Cart item update" });
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

export const addAddress = async (req, res) => {
  try {
    const token = req.cookies.token;
    const { name, phoneNo, pincode, address, state } = req.body.address;
    console.log(name);
    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
      if (err) return res.json({ success: false, loggedIn: false });
      const user = await User.findOne({ email: decode.email });
      user.addresss.push({
        name: name,
        phoneNumber: phoneNo,
        pincode: pincode,
        addresss: address,
        state: state,
      });
      await user.save();

      res.json({ success: true, msg: "Address added successfully" });
    });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};
