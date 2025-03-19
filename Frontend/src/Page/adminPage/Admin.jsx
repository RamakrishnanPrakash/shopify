import { NavLink, Outlet } from "react-router-dom";
import { Add } from "./Add";
import { assets } from "../../assets/assets";
import { List } from "./List";
import { Order } from "./Order";

export const Admin = () => {
  return (
    <div>
      <nav className="w-full bg-white sticky z-50 top-0 left-0 border-b border-gray-400 px-5 py-3">
        <div className="w-[95%] mx-auto flex items-end justify-between">
          <a href="">
            <img src={assets.logo} className="w-28" alt="" />
          </a>

          <h6 className="font-bold bg-gray-800 py-2 px-5 text-white/90 rounded-full">
            Admin
          </h6>
        </div>
      </nav>

      <div className="flex  ">
        <div className="w-[100px] md:w-[250px] min-h-[90vh]  border-r border-gray-400 flex flex-col">
          <NavLink
            to={"/admin/add"}
            className={({ isActive }) =>
              `w-full px-3 mt-2 py-3 flex justify-center md:justify-start gap-2 transition-all ${
                isActive
                  ? "bg-orange-100 border-r-4 border-orange-500"
                  : "bg-transparent border-r-0"
              }`
            }>
            <img src={assets.add_icon} className="" alt="" />{" "}
            <p className="hidden md:flex">Add Product</p>
          </NavLink>
          <NavLink
            to={"/admin/list"}
            className={({ isActive }) =>
              `w-full px-3 mt-2 py-3  flex justify-center md:justify-start gap-2 ${
                isActive
                  ? "bg-orange-100 border-r-4 border-orange-500"
                  : "bg-transparent border-r-0"
              }`
            }>
            <img src={assets.list_icon} alt="" />{" "}
            <p className="hidden md:flex">Product List</p>
          </NavLink>
          <NavLink
            to={"/admin/order"}
            className={({ isActive }) =>
              `w-full px-3 mt-2 py-3  flex justify-center md:justify-start gap-2 ${
                isActive
                  ? "bg-orange-100 border-r-4 border-orange-500"
                  : "bg-transparent border-r-0"
              }`
            }>
            <img src={assets.order_icon} alt="" />
            <p className="hidden md:block">Order</p>
          </NavLink>
        </div>
        <div className="">
          <Outlet>
            <Add />
            <List />
            <Order />
          </Outlet>
        </div>
      </div>
    </div>
  );
};
