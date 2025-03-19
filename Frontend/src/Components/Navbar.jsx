import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext.jsx";
import { Profile } from "./Profile.jsx";

export const Navbar = () => {
  const { isLoginPage, setIsLoginPage, isLogin } = useContext(StoreContext);
  return (
    <div className="w-[100%] h-auto  relative mb-[70px]">
      <div className="w-full bg-white fixed z-40 top-0 left-0 border-b border-gray-300 ">
        <div className="w-[80%] mx-auto py-2 flex items-center justify-between">
          <a href="/">
            <img src={assets.logo} alt="logo" className="w-28" />
          </a>

          <ul className="hidden md:flex items-center justify-center gap-6">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-[3px] border-orange-500" : "border-b-0"
                }
                to={"/"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shop"}
                className={({ isActive }) =>
                  isActive ? "border-b-[3px] border-orange-500" : "border-b-0"
                }>
                Shop
              </NavLink>
            </li>
            <li>
              <Link to={"/"}>About Us</Link>
            </li>
            <li to={"/"}>
              <Link>Contact</Link>
            </li>
          </ul>
          {isLogin ? (
            <Profile />
          ) : (
            <div
              className="flex gap-1 items-center justify-center cursor-pointer"
              onClick={() => {
                setIsLoginPage(!isLoginPage);
              }}>
              <img src={assets.account} alt="account" className="w-6" />
              <a>Account</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
