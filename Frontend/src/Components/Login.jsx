import { useContext, useState } from "react";
import { assets, BACKEND_URL } from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";
import { Loading } from "./Regiter";
import axios from "axios";
import toast from "react-hot-toast";

export const Login = () => {
  const { setIsLoginPage, setIsLoginComponent } = useContext(StoreContext);
  const [inputData, setIsInputData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    setIsInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(inputData);
    const response = await axios.post(
      `${BACKEND_URL}/api/v0/user/login`,
      { email: inputData.email, password: inputData.password },
      {
        withCredentials: true,
      }
    );
    if (!response.data.success) {
      return toast.error(response.data.msg, { position: "top-right" });
    }
    toast.success(response.data.msg);
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-[350px] sm:w-[380px] bg-white rounded-lg py-8 ">
        <img
          src={assets.close_icon}
          className="w-4 absolute top-4 cursor-pointer right-4"
          onClick={() => setIsLoginPage(false)}
          alt="Close"
        />
        <img src={assets.logo} className="w-24 mx-auto mb-1" alt="" />
        <h6 className="text-gray-700 text-center my-2 mb-2 font-semibold text-xl">
          Sign in to Shopify Ecommerce
        </h6>
        <p className="text-gray-600 text-sm text-center mb-2">
          Welcome back! Please sign in to continue
        </p>

        <form
          className="px-5 flex flex-col "
          onSubmit={(e) => submitHandler(e)}>
          <div className="flex flex-col px-2">
            <label htmlFor="email" className="text-gray-700 mb-2">
              Email address{" "}
            </label>
            <input
              type="text"
              placeholder="Enter your email address"
              className="outline-0  text-lg border text-gray-700 border-gray-400 focus:border-orange-500 focus:py-3 pl-3 py-2 rounded-lg "
              name="email"
              value={inputData.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="flex flex-col px-2">
            <label htmlFor="password" className="text-gray-700 mb-2">
              Password{" "}
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="outline-0  text-lg border text-gray-700 border-gray-400 focus:border-orange-500 focus:py-3 pl-3 py-2 rounded-lg "
              name="password"
              value={inputData.password}
              onChange={onChangeHandler}
              required
            />
          </div>

          {isLoading ? (
            <div className="bg-orange-600 mt-3 rounded-lg ">
              <Loading />
            </div>
          ) : (
            <button
              type="submit"
              className="flex items-center justify-center gap-1   bg-orange-500 text-white py-2 mt-3  rounded-lg">
              <p className="text-lg">Continue</p>
              <img src={assets.right_arrow_light} className="w-4" alt="Arrow" />
            </button>
          )}

          <div className="py-2 border-t border-b border-gray-300 mt-3">
            <p className="text-gray-600 text-center">
              Don’t have an account?
              <a
                className="text-gray-800 font-bold ml-2 cursor-pointer "
                onClick={() => setIsLoginComponent(false)}>
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
