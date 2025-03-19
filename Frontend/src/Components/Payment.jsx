import React, { useRef, useState } from "react";
import { assets } from "../assets/assets";

export const Payment = ({
  selectedData,
  finalProductList,
  option,
  setOption,
}) => {
  // console.log("finalProductList", finalProductList);
  const cashOnDelivery = () => {
    setOption({
      cashOnDelivery: true,
      onlinePayment: false,
    });
  };

  const onlinePaymentDelivery = () => {
    setOption({
      cashOnDelivery: false,
      onlinePayment: true,
    });
  };

  // console.log(option);
  return (
    <div className="w-full flex flex-col gap-3 py-1 ">
      <div
        onClick={() => cashOnDelivery()}
        className={`${
          option.cashOnDelivery ? "bg-orange-100" : "bg-transparent"
        } py-3 px-5 border border-orange-200 cursor-pointer rounded-md flex justify-between gap-2 items-center`}>
        <div className="">
          {option.cashOnDelivery ? (
            <>
              <img src={assets.check_icon} className="w-6" alt="" />
            </>
          ) : (
            <div className="w-[20px] h-[20px] border border-orange-300 rounded-md"></div>
          )}
        </div>
        <div className="">
          <h1 className="font-bold text-lg text-gray-600">COD</h1>
          <p className=" text-gray-400">cash on delivery</p>
        </div>
        <div className="">
          <p>
            $
            {Intl.NumberFormat("en-IN", {
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(
              Number(finalProductList.price) *
                Number(finalProductList.quantity) +
                123
            )}
          </p>
        </div>
      </div>
      <div
        onClick={onlinePaymentDelivery}
        className={`${
          option.onlinePayment ? "bg-orange-100" : "bg-transparent"
        } py-3 px-5 border border-orange-200 cursor-pointer rounded-md flex justify-between gap-2 items-center`}>
        <div className="">
          {option.onlinePayment ? (
            <>
              {" "}
              <img src={assets.check_icon} className="w-6" alt="" />
            </>
          ) : (
            <div className="w-[20px] h-[20px] border border-orange-300 rounded-md"></div>
          )}
        </div>
        <div className="">
          <h1 className="font-bold text-lg text-gray-600">Stripe Payment</h1>
          <p className=" text-gray-400">make online payment</p>
        </div>
        <div className="">
          <p>
            $
            {Intl.NumberFormat("en-IN", {
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(
              Number(finalProductList.price) *
                Number(finalProductList.quantity) +
                123
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
