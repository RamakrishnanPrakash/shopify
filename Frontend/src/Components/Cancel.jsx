import { useEffect } from "react";
import { assets, BACKEND_URL } from "../assets/assets";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Cancel = () => {
  const loacation = useLocation();
  const queryParams = new URLSearchParams(loacation.search);
  const id = queryParams.get("id");
  const success = queryParams.get("success") == "true" ? true : false;

  const isCancel = async () => {
    if (!success && id.length > 0) {
      console.log(id, success);
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v0/order/payment/cancel`,
          { id: id, success: false },
          { withCredentials: true }
        );
        if (response.data.success && !response.data.payment)
          return window.location.replace("/card");
      } catch (error) {
        toast.error(error.message, { position: "top-right" });
        return window.location.replace("/");
      }
    }
  };

  useEffect(() => {
    isCancel();
  }, [success, id]);

  return (
    <div className="w-11/12 mx-auto h-[80vh] flex items-center justify-center flex-col">
      <div className="w-full h-screen fixed top-0 left-0"></div>
      <div className="w-[150px] h-[150px] border-[10px] border-gray-300 border-t-red-400 relative animate-spin rounded-full"></div>
      <div className="fixed bottom-24 left-0 w-full">
        <h1 className="mt-4 text-gray-500 text-xl font-semibold text-center">
          Your order cancelled
        </h1>
        <p className="text-center mt-2 text-gray-400">Please wait...</p>
      </div>
    </div>
  );
};
