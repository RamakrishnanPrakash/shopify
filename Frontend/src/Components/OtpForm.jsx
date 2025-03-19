import { useContext, useEffect, useRef, useState } from "react";
import { assets, BACKEND_URL } from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";
import { Loading } from "./Regiter";
import toast from "react-hot-toast";
import axios from "axios";

export const OtpForm = ({ setIsOtpForm, formData, setFormData }) => {
  const { setIsLoginPage } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));

  const [validateTime, setValidateTime] = useState(50);

  const inputRef = useRef([]);

  const submitHandler = async () => {
    setIsLoading(true);

    const otpString = otp.join("");
    console.log(otpString);

    const data = {
      email: formData.email,
      password: formData.password,
      otp: otpString,
    };

    const response = await axios.post(
      `${BACKEND_URL}/api/v0/user/verify/user`,
      data,
      { withCredentials: true }
    );
    console.log(response);
    if (!response.data.success) {
      setIsLoading(false);
      toast.error(response.data.msg, {
        position: "top-right",
        className: "float-right",
      });
      return;
    }

    setIsLoginPage(false);
    goBackRegisterForm();
    setFormData({ email: "", password: "" });
    toast.success(response.data.msg || "Registration completed successfully");
    setTimeout(() => window.location.replace("/"), 2000);
    return;
    // console.log(formData);
  };

  const ResubmitHandler = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v0/user/new`, {
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      if (response.data.success && response.data.sendOtp) {
        setOtp(new Array(4).fill(""));
      }
      toast.success(`Resend verification code to ${formData.email}`, {
        position: "top-right",
      });
      setValidateTime(50);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed" + error.message
      );
    }
  };

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  useEffect(() => {
    if (validateTime === 0) return;

    const timer = setInterval(() => {
      setValidateTime(validateTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [validateTime]);

  useEffect(() => {
    const submit = async () => {
      if (otp.join("").length == otp.length) {
        await submitHandler();
      }
    };
    submit();
  }, [otp]);

  const onChangeHandler = async (e, index) => {
    const value = e.target.value;

    // Allow only numbers & limit to one digit
    if (isNaN(value)) return;
    const digit = value.slice(-1);

    setOtp((prev) => prev.map((_, i) => (i === index ? digit : _)));

    // Move focus to the next input (if not the last index)
    if (digit && index < otp.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const onkeydownHandler = (e, index) => {
    console.log("Ramakrishnan");
    if (e.key == "Backspace" && !otp[index] && index > 0)
      inputRef.current[index - 1].focus();
  };

  const goBackRegisterForm = () => {
    setIsOtpForm(false);
    setOtp([]);
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="relative w-[350px] sm:w-[380px] bg-white rounded-lg py-8 flex flex-col items-center ">
        <div
          className="absolute top-4 left-4 cursor-pointer"
          onClick={goBackRegisterForm}>
          <div className="flex gap-1">
            <img src={assets.left_arrow} className="w-4" alt="" />
            <p className="text-gray-500">Back</p>
          </div>
        </div>

        <h6 className="text-gray-700 text-center my-2 mb-4 font-semibold text-xl">
          Verify your email
        </h6>
        <p className="text-gray-600 text-sm text-center mb-2">
          Enter the verification code sent to your email
        </p>
        <p className="flex gap-1 items-center justify-center text-gray-600 text-sm text-center mb-2">
          {formData.email}
          <img src={assets.pencil_icon} alt="" />
        </p>

        <form className="flex items-center justify-evenly gap-4 mt-2  ">
          {otp.map((value, index) => (
            <input
              ref={(el) => (inputRef.current[index] = el)}
              type="text"
              key={index}
              value={otp[index]}
              maxLength={1}
              onChange={(e) => onChangeHandler(e, index)}
              onKeyDown={(e) => onkeydownHandler(e, index)}
              className="text-center outline-0 w-[50px] h-[50px] 
              text-lg py-1 px-1  font-bold rounded-xl border border-gray-400 focus:border-orange-500"
            />
          ))}
        </form>

        <button
          className="text-gray-700  text-center my-2 mx-auto"
          disabled={validateTime > 0 ? true : false}
          onClick={ResubmitHandler}>
          Didn't receive a code ? Resend{" "}
          {validateTime > 9 ? `( ${validateTime}s )` : `( 0${validateTime}s )`}
        </button>

        {isLoading ? (
          <>
            <button className="w-[80%] mx-auto rounded-lg bg-orange-500/70 flex items-center justify-center ">
              <Loading
                buttonStyle={" mt-1 rounded-lg  shadow-xl shadow-white  "}
                childStyle={
                  "w-[30px] h-[30px] border-[4px] border-white rounded-full border-t-gray-900 animate-spin-fast"
                }></Loading>
            </button>
          </>
        ) : (
          <button
            disabled={isLoading}
            onClick={submitHandler}
            className="flex items-center justify-center gap-1 w-[80%]  bg-orange-500 text-white py-2 mt-1 text-center rounded-lg">
            <p className="text-lg">Continue</p>{" "}
            <img src={assets.right_arrow_light} className="w-4" alt="" />
          </button>
        )}
      </div>
    </div>
  );
};
