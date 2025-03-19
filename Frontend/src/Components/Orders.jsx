import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { assets, BACKEND_URL } from "../assets/assets";
import { Fooder } from "./Fooder";

export const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isEmpty, setIsEmpty] = useState(false);
  const [data, setData] = useState([]);
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v0/order/user`, {
        withCredentials: true,
      });

      console.log(response);

      if (!response.data.success || response.data.isEmpty) {
        setIsEmpty(true);
        setData([]);
      }

      if (response.data.success) {
        setData(response.data.order);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, []);
  return (
    <div className="w-full  flex items-center justify-center flex-col gap-3">
      {isLoading ? (
        <>
          <div className="w-[120px] mt-20 animate-spin h-[120px] border-[8px] rounded-full border-gray-300 border-t-orange-500"></div>
          <h1 className="mt-1 text-xl text-gray-500">Please wait..</h1>
        </>
      ) : (
        <>
          {isEmpty ? (
            <>
              <div className="w-full h-[80vh] flex justify-center flex-col items-center ">
                <img src={assets.box_icon} className="w-28" alt="" />
                <h1 className="mt-4 text-2xl font-bold text-gray-500">
                  Not yet any order
                </h1>
                <div className="flex gap-1 items-center justify-center mt-2 hover:scale-105 duration-1000">
                  <img src={assets.right_arrow1} alt="" />
                  <a href="/" className=" text-lg text-orange-500">
                    Continue Shopping...
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-11/12 mx-auto  px-20">
                <h1 className=" text-xl  text-gray-500 mt-5">My Orders</h1>
                <div className="flex flex-col mt-6">
                  {data.map((order, index) => (
                    <div
                      className="flex flex-col md:flex-row items-start gap-2  md:items-center justify-around border-b border-t py-3 border-gray-300"
                      key={index}>
                      <div className="flex items-center justify-start gap-4 min-w-[220px]">
                        <img src={assets.box_icon} alt="" />
                        <div className="">
                          <h1 className="text-gray-500">
                            {order.name.slice(0, 15)}..
                          </h1>
                          <p className="text-gray-400">
                            Quantity:{" "}
                            <span className="text-orange-500">
                              {order.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <h1 className="text-gray-500">categories</h1>
                        <p className="text-orange-500">{order.categories}</p>
                      </div>
                      <div className="text-gray-500">
                        ${" "}
                        {Intl.NumberFormat("en-IN", {
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format(Number(order.totalAmount))}
                      </div>
                      <div className="">
                        <p className="text-gray-500">
                          Payment method:{order.paymentMethod}
                        </p>
                        <p className="text-gray-500">
                          Payment:{order.isPayment ? "Completed" : "Pending"}
                        </p>
                        <p className="text-gray-500">
                          Date:
                          {order.date
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center justify-center">
                        <div className="w-[10px] h-[10px] rounded-full bg-green-300 shadow-2xl shadow-green-300"></div>
                        <p className="text-orange-400 text-sm max-w-[120px]">
                          {order.orderStatus}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-24 w-full">
                <Fooder />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
