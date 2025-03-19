import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets, BACKEND_URL } from "../assets/assets";
import toast from "react-hot-toast";
import { Product } from "../Components/Product";
import { StoreContext } from "../Context/StoreContext";

export const Products = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const { user, isLogin, setIsLoginComponent, setIsLoginPage, setUser } =
    useContext(StoreContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v0/product/${id}`);
        console.log(response);
        if (!response.data.success) {
          window.location.replace("/");
          setTimeout(() => {
            toast.error("Data not fount");
          }, 1000);
        }
        setProduct(response.data.product);
      } catch (error) {
        toast.error("Data not fount");

        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addCardItem = async (id) => {
    console.log("email");
    console.log(user);
    if (!isLogin) {
      setIsLoginPage(true);
      setIsLoginComponent(true);
      return;
    }
    if (isLogin) {
      const response = await axios.patch(
        `${BACKEND_URL}/api/v0/user/card/${id}`,
        {
          email: user.email,
        }
      );
      if (response.data.success) {
        setUser((prev) => ({ ...prev, ["cart"]: response.data.cart }));
        toast.success("Product update in your cart");
      }
    }
    // const response = await axios.patch(`${BACKEND_URL}/api/v0/user/card/${id}`);
  };
  const buyNowItem = async (id) => {
    addCardItem(id);
    if (isLogin) setTimeout(() => window.location.replace("/card"), 1000);
  };
  console.log(id);
  return (
    <>
      <div className="flex flex-col md:flex-row gap-16 items-center justify-evenly py-6 px-16">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col items-center justify-center ">
              <div className="bg-gray-100 py-5 px-6 w-full flex items-center justify-center">
                <img
                  src={`${BACKEND_URL}/uploads/${
                    product && product.images[imageIndex]
                  }`}
                  alt=""
                  className="max-w-[300px]"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 ">
                {product.images.map((item, index) => (
                  <div
                    className={`bg-gray-100 p-1 flex items-center justify-center mt-9 rounded-lg ${
                      imageIndex === index
                        ? "border border-orange-500"
                        : "border-none"
                    }`}
                    key={index}>
                    <img
                      src={`${BACKEND_URL}/uploads/${item}`}
                      className="max-w-[80px] cursor-pointer"
                      alt=""
                      onClick={() => setImageIndex(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="max-w-[500px]">
              <h1 className="text-3xl text-gray-700 font-bold mb-2 ">
                {product.name}
              </h1>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <img
                    key={index}
                    src={assets.star_icon}
                    className="w-5"
                    alt=""
                  />
                ))}
                <img src={assets.star_dull_icon} className="w-5" alt="" />
                <a>{"(4.5)"}</a>
              </div>
              <p className="leading-8 text-gray-600">{product.description}</p>

              <div className="flex gap-2 items-end  mt-2 border-b border-gray-300 pb-4">
                <h2 className="font-bold text-3xl text-gray-800">
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(Number(product.offerPrice))}
                </h2>
                <p>
                  <strike className="text-gray-500 text-lg">
                    {Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </strike>
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-5 max-w-[180px]">
                <div className="flex gap-3 ">
                  <p className="text-gray-700  w-[80px]">Brand</p>{" "}
                  <p className="text-gray-400 ">Generic</p>
                </div>

                <div className="flex gap-3">
                  <p className="text-gray-700  w-[80px]">Color</p>{" "}
                  <p className="text-gray-400 ">Multi</p>
                </div>
                <div className="flex gap-3">
                  <p className="text-gray-700  w-[80px]">Category</p>{" "}
                  <p className="text-gray-400 ">{product.categories}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => addCardItem(product._id)}
                  className="w-[50%] text-lg py-3 rounded-md bg-gray-300 hover:bg-gray-400">
                  Add to Card
                </button>
                <button
                  onClick={() => buyNowItem(product._id)}
                  className="w-[50%] text-lg py-3 rounded-md bg-orange-500 hover:bg-orange-600 text-center text-white">
                  Buy now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Product />
      <div className="w-[100%] flex items-center justify-center py-5 border-t border-gray-400">
        <h1 className="text-gray-500">
          Copyright 2025 © Shopify All Right Reserved.
        </h1>
      </div>
    </>
  );
};

export const Loading = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="w-[100px] h-[100px] border-[8px] animate-spin  border-b-orange-500 rounded-full border-gray-800"></div>
      <p className="text-orange-500">Please wait...</p>
    </div>
  );
};
