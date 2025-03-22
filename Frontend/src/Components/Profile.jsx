import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import { assets, BACKEND_URL } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

export const Profile = () => {
  const { setIsLogin, isLogin, user, setUser, setIsLoginPage } =
    useContext(StoreContext);

  const [blur, setIsBlur] = useState(false);
  const dropdownRef = useRef(null);
  console.log(isLogin);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBlur(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const signOut = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${BACKEND_URL}/api/v0/user/logout`, {
      withCredentials: true,
    });

    console.log(response);
    if (response.data.success) {
      setUser({
        email: "",
        createdAt: "",
        image: "",
        cart: [],
      });
      setIsLogin(false);
      // window.location.replace("/");
    }
  };
  const card = (e) => {
    e.preventDefault();
    // user.cart.length > 0
    //   ? window.location.replace("/card")
    //   : toast.error("Your card items empty");
    window.location.replace("/card");
  };
  const moveOrderpage = (e) => {
    e.preventDefault();
    window.location.replace("/order");
  };

  return (
    <div className="flex gap-4 items-end justify-between">
      <div className="relative">
        <button
          onFocus={() => setIsBlur(true)}
          className="w-[30px] h-[30px] bg-orange-500 text-white text-lg font-bold rounded-full">
          {user?.email.slice(0, 1).toUpperCase()}
        </button>
        <div
          ref={dropdownRef}
          className={` ${
            blur ? "fixed" : "hidden"
          }  top-14 right-1 z-50 w-[300px] duration-700 transition ease-in-out h-auto md:w-[350px] shadow-md shadow-gray-400 bg-white border  border-t-0 border-gray-400`}>
          <div className=" w-[90%] mx-auto flex flex-col md:flex-row gap-4 px-5 mt-4 py-1 items-center border-b border-gray-400 ">
            <div className="w-[40px] h-[40px]  shadow-lg shadow-gray-500 flex items-center justify-center bg-neutral-500 text-white text-lg font-bold rounded-full">
              {user.email.slice(0, 1).toUpperCase()}
            </div>
            <div className="flex flex-col gap-1  mb-2">
              <p
                className="mt-1 text-lg  text-gray-700 truncate max-w-[200px]
          ">
                {user.email}
              </p>
              <p className="text-sm  text-gray-400 text-center md:text-left">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col px-5">
            <button
              onClick={(e) => card(e)}
              className="flex items-center gap-4 mt-1 border-b border-neutral-300 py-2 ">
              <img src={assets.cards_icon} className="w-6 mx-3" alt="" />
              <a href="" className=" text-neutral-500">
                card
              </a>
            </button>
            <button className=" flex items-center gap-4 mt-1 border-b border-neutral-300 py-2 ">
              <img src={assets.order_icons} className="w-5 mx-3" alt="" />
              <a onClick={moveOrderpage} className=" text-neutral-500">
                My Order
              </a>
            </button>
            <button
              onClick={(e) => signOut(e)}
              className=" flex items-center gap-4 mt-1 border-b border-neutral-300 py-2 ">
              <img src={assets.sign_out_icon} className="w-5 mx-3" alt="" />
              <a className=" text-neutral-500">Sign out</a>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsBlur(false);
                setIsLoginPage(true);
              }}
              className=" flex items-center gap-4 mt-1 border-b mb-6 border-neutral-300 py-2 ">
              <img src={assets.add} className="w-5 mx-3" alt="" />
              <a href="" className=" text-neutral-500">
                New account
              </a>
            </button>
          </div>
        </div>
      </div>
      <div
        className="relative cursor-pointer"
        onClick={() => window.location.replace("/card")}>
        <div className=" bg-gray-500 absolute -top-4 -right-3 h-[25px] w-[25px]  text-center rounded-full">
          <div className="flex items-center justify-center text-white mt-[1px]">
            {user.cart.length > 0 ? user.cart.length : 0}
          </div>
        </div>
        <img src={assets.card_icon} className="w-6" alt="" />
      </div>
    </div>
  );
};
