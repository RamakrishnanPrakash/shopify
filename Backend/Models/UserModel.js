import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  addresss: [
    {
      name: { type: String, require: true },
      phoneNumber: { type: String, require: true },
      pincode: { type: String, require: true },
      addresss: { type: String, require: true },
      state: { type: String, require: true },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
