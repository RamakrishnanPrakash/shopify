import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, require: true },
  otp: { type: String, require: true },
  expires: { type: Date, require: true, index: { expires: 50 } },
});
const Otpmodel =
  mongoose.models.Otpmodel || mongoose.model("Otpmodel", otpSchema);

export default Otpmodel;
