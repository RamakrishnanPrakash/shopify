import { useEffect, useState } from "react";
import { assets, BACKEND_URL } from "../assets/assets";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const Success = () => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");
  const id = queryParams.get("id");
  console.log(success, id);

  const isSuccess = async () => {
    if (success && id) {
      const response = await axios.post(
        `${BACKEND_URL}/api/v0/order/payment/success`,
        { success: true, id: id },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        setIsLoading(false);

        setTimeout(() => window.location.replace("/order"), 1500);
      }
    }
  };
  useEffect(() => {
    isSuccess();
  });
  return (
    <div className="w-11/12 mx-auto h-[80vh] flex items-center justify-center flex-col">
      {isLoading && (
        <div className="relative w-[150px] h-[150px] flex items-center flex-col justify-center">
          <>
            <div className="absolute w-full h-full border-[10px] border-gray-300 border-t-[#75E95E] rounded-full animate-spin"></div>
            <h1 className="text-lg text-[#75E95E] font-bold">Please wait </h1>
            <p className="text-sm text-[#75e95ea1] font-bold">processing...</p>
          </>
        </div>
      )}
      {!isLoading && (
        <div className="relative w-full flex items-center justify-center">
          <img src={assets.CheckOutline} className="w-[350px] " />
          <h1
            className="text-2xl w-full
           font-bold absolute bottom-4 text-center left-1/2 -translate-x-1/2 text-green-500">
            Order Placed successfully
          </h1>
        </div>
      )}
    </div>
  );
};
