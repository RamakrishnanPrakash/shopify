import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { assets, BACKEND_URL } from "../assets/assets";
import { toast } from "react-hot-toast";
import { OtpForm } from "./OtpForm";
import axios from "axios";
import { Login } from "./Login";

export const Regiter = () => {
  const { isLoginPage, setIsLoginPage, isLoginComponent, setIsLoginComponent } =
    useContext(StoreContext);
  const [isPassword, setIsPassword] = useState(true);
  const formParentRef = useRef(null);
  const formChildRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpForm, setIsOtpForm] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Form Submit
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormData({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v0/user/new`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success && response.data.sendOtp) {
        setIsOtpForm(true);
      }
      if (!response.data.success) {
        toast.error(response.data.msg, { position: "top-right" });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed" + error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the form
      if (formChildRef.current && formChildRef.current.contains(event.target)) {
        setIsLoginPage(true);
        return;
      }
      if (
        formParentRef.current &&
        formParentRef.current.contains(event.target)
      ) {
        setIsLoginPage(false);
      }
    };

    if (isLoginPage) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const RegisterForm = () => {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        ref={formParentRef}>
        <div
          className="relative w-[350px] sm:w-[380px] bg-white rounded-lg py-8"
          ref={formChildRef}>
          <img
            src={assets.close_icon}
            className="w-4 absolute top-4 cursor-pointer right-4"
            onClick={() => setIsLoginPage(false)}
            alt="Close"
          />
          <img src={assets.logo} className="w-24 mx-auto mb-1" alt="" />

          <h6 className="text-gray-700 text-center my-2 mb-2 font-semibold text-xl">
            Create your account
          </h6>
          <p className="text-gray-600 text-sm text-center mb-2">
            Welcome! Please fill in the details to get started.
          </p>
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col gap-3 px-6">
            <div className="w-full">
              Email address
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                className="w-full mt-2 outline-0 border border-gray-400  focus:border-orange-500 focus:py-3 pl-3 py-2 rounded-lg "
                required
                id="email"
                ref={emailRef}
              />
            </div>
            <div className="w-full">
              <label className="flex flex-col" htmlFor="password">
                Password
                <div className="flex items-center border border-gray-400 pl-3 py-2 rounded-lg focus-within:border-orange-500">
                  <input
                    type={isPassword ? "password" : "text"}
                    placeholder="Enter your password"
                    name="password"
                    className="flex-1 w-full outline-0 focus:py-1"
                    required
                    id="password"
                    ref={passwordRef}
                  />
                  <button
                    type="submit"
                    className="cursor-pointer mr-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsPassword(!isPassword);
                    }}>
                    <img
                      src={isPassword ? assets.eyeOff_icon : assets.eye_icon}
                      className="w-6"
                      alt="Toggle visibility"
                    />
                  </button>
                </div>
              </label>
            </div>

            {isLoading ? (
              <button className="w-full mx-auto rounded-lg bg-orange-500/70 flex items-center justify-center ">
                <Loading
                  buttonStyle={" mt-1 rounded-lg  shadow-xl shadow-white  "}
                  childStyle={
                    "w-[30px] h-[30px] border-[4px] border-white rounded-full border-t-gray-900 animate-spin-fast"
                  }></Loading>
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center gap-1 bg-orange-500 text-white py-2 mt-1 rounded-lg">
                <p className="text-lg">Continue</p>
                <img
                  src={assets.right_arrow_light}
                  className="w-4"
                  alt="Arrow"
                />
              </button>
            )}

            <div className="py-2 border-t border-b border-gray-300 mb-3">
              <p className="text-gray-600 text-center">
                Already have an account?{" "}
                <a
                  className="text-gray-800 font-bold cursor-pointer"
                  onClick={() => setIsLoginComponent(true)}>
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        isLoginPage
          ? "fixed w-full h-screen top-0 right-0 z-50 bg-black/70"
          : "hidden"
      }
      ref={formParentRef}>
      {isLoginComponent ? (
        <Login />
      ) : (
        <>
          {isOtpForm ? (
            <OtpForm
              setIsOtpForm={setIsOtpForm}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <RegisterForm />
          )}
        </>
      )}
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="flex items-center justify-center py-1 mt-1 rounded-lg ">
      <div className="w-[30px] h-[30px] border-[4px] border-white rounded-full border-t-gray-900 animate-spin-fast"></div>
    </div>
  );
};
