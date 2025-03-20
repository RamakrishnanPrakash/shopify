import { useState } from "react";
import { assets, BACKEND_URL, productsDummyData } from "../assets/assets";

export const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const currncyConvertor = (currency) => {
    return new Intl.NumberFormat("en-Us", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(currency);
  };
  return (
    <div className="w-[95%] md:w-[80%] mx-auto py-5 px-5">
      <h1 className="font-semibold text-2xl tracking-wider">
        Popular Products
      </h1>
      <div
        className="w-full my-3 grid grid-cols-2 sm:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {productsDummyData.map((product, index) => (
          <div className="shadow shadow-gray-200/10 relative" key={product._id}>
            <div
              className={`${
                isLoading
                  ? "absolute top-0 left-0 w-full h-[250px] bg-slate-200 z-30 animate-pulse"
                  : "hidden"
              } `}>
              <div className="w-full h-full flex items-center justify-center ">
                <div className="w-[50px] h-[50px] border-[5px] border-gray-800 border-t-orange-500 animate-spin rounded-full"></div>
              </div>
            </div>
            <div className="w-full h-52 group p-2 overflow-hidden rounded-lg relative flex items-center justify-center bg-gray-500/10 cursor-pointer">
              <img
                src={`${BACKEND_URL}/uploads/${
                  product.images[0]
                }?timestamp=${new Date().getTime()}`}
                className={`${
                  isLoading
                    ? "hidden"
                    : " block max-w-4/5 max-h-4/5 md:w-full md:h-full object-cover group-hover:scale-105 transition"
                }`}
                width={800}
                height={800}
                alt={product.images[0]}
                onLoad={() => setIsLoading(false)}
                onClick={() =>
                  window.location.replace(`/product/${product._id}`)
                }
              />

              <button className="w-6 h-6 shadow-md shadow-gray-500 absolute z-20 top-3 right-3 flex items-center justify-center bg-white rounded-full ">
                <img src={assets.heard_icon} className="w-4" alt="" />
              </button>
            </div>
            <div
              className={`${
                isLoading ? "opacity-0" : " opacity-100 w-full p-2"
              }`}>
              <h6 className=" block overflow-hidden  whitespace-nowrap my-1 text-gray-600">
                {product.name}
              </h6>
              <p className="w-full overflow-hidden truncate mb-1 whitespace-nowrap text-xs font-light text-gray-400">
                {product.description}
              </p>
              <div className="flex gap-1 items-center mb-2 ">
                <p className="text-gray-600 text-xs">4.5</p>

                {Array.from({ length: 4 }).map((_, index) => (
                  <img
                    key={index}
                    src={assets.star_icon}
                    className="w-3"
                    alt=""
                  />
                ))}

                <img src={assets.star_dull_icon} className="w-3" alt="" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  {currncyConvertor(Number(product.offerPrice))}
                </p>
                <a
                  href={`/product/${product._id}`}
                  className="text-gray-400 border border-gray-300 rounded-full px-2 py-[1px] text-center">
                  buy now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex items-center justify-center mt-2">
        <button className="py-2 px-4 rounded-lg text-lg border border-gray-400 text-gray-500">
          See more
        </button>
      </div>
    </div>
  );
};
