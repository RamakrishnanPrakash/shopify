import mailSend from "../Mail/mailConfig.js";
import Otpmodel from "../Models/OtpModel.js";
import User from "../Models/UserModel.js";

export const sentOtp = async (req, res) => {
  try {
    const { email } = req.body;

    //user collection maintain email uniq
    const isEmail = await User.findOne({ email });
    console.log(isEmail);
    if (isEmail)
      return res.json({
        success: false,
        sendOtp: false,
        msg: "Email address already taken",
      });

    const OTP = Math.floor(1000 + Math.random() * 9000);
    console.log(OTP);

    const content = `<h1 style="color: rgba(0, 0, 0, 0.767); text-align: center;margin-bottom: 3px;">Verify Your Account</h1>
    <div style="text-align: center; margin: auto;">
       <img src="http://localhost:3000/uploads/logo.png" alt="" width="40px" style="margin-bottom: 3px;">
    </div>
    <h3  style="text-align: center; margin-bottom: 2px; ">Your One-Time Password (OTP) for verification is</h3>
    <h1 style="text-align: center; margin-bottom:2px;">${OTP}</h1>
    <p style="text-align: center;">This OTP is valid for only <b>5 minutes</b>. Please do not share it with anyone.
       If you did not request this, please ignore this email.</p>`;
    console.log(email);

    //already otp collectio email here just update otp and expires time
    const exitEmail = await Otpmodel.find({ email: email });
    if (exitEmail.length > 0) {
      await Otpmodel.findOneAndUpdate(
        { email },
        { otp: OTP },
        { expires: new Date(Date.now() + 50 * 1000) },
        { new: true, upset: true }
      );
      await mailSend(email, "Verify Your Account", content);
      return res.json({
        success: true,
        sendOtp: true,
        msg: "Otp send successfully",
      });
    }

    const newOtpDocument = new Otpmodel({
      email: email,
      otp: OTP,
      expires: new Date(Date.now() + 50 * 1000),
    });
    await newOtpDocument.save();

    console.log(email);
    await mailSend(email, "Verify Your Account", content);
    return res.json({
      success: true,
      sendOtp: true,
      msg: "Otp send successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;
    const otpRecord = await Otpmodel.findOne({ email: email, otp: otp });
    if (!otpRecord) {
      return res.json({
        success: false,
        msg: "Please enter valid code",
      });
    }
    if (otpRecord.expires < new Date()) {
      await Otpmodel.deleteOne({ email, otp });
      return res.json({ success: false, msg: "OTP has expired" });
    }

    if (otpRecord) {
      req.validUser = true;
      next();
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};
