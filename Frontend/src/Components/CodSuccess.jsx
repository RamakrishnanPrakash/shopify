import { useEffect } from "react";
import { assets } from "../assets/assets.js";

export const CodSuccess = () => {
  useEffect(() => {
    setTimeout(() => window.location.replace("/order"), 2000);
  }, []);
  return (
    <div className="w-11/12 mx-auto h-[80vh] flex items-center justify-center flex-col">
      <div className="w-[450px] h-[450px] flex items-center justify-center relative flex-col">
        <img src={assets.CheckOutline} className="" alt="" />
        <h1
          className="
         text-green-500 text-2xl font-semibold mb-1 text-center">
          Order placed successfully
        </h1>
        <p className="text-center  text-green-400">Please wait...</p>
      </div>

      <div className="fixed bottom-40 left-0 w-full"></div>
    </div>
  );
};
