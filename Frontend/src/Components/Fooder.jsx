import { assets } from "../assets/assets";

export const Fooder = () => {
  return (
    <>
      <div className="w-[95%] md:w-[80%] py-10 mx-auto">
        <h1 className="text-gray-700 tracking-wider font-bold text-2xl lg:text-3xl text-center">
          Subscribe now & get 20% off
        </h1>
        <p className="text-gray-400 text-center max-w-[700px] mx-auto my-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div className="w-full flex items-center justify-center mt-3">
          <div className="flex w-[350px] md:w-[500px] items-center justify-center border mt-7 border-gray-400">
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your email id"
              className=" flex-1 outline-0 text-lg pl-3 text-gray-600"
            />
            <button className="py-3 px-4 bg-orange-600 text-white">
              Subscrie
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------------- */}

        <div className="flex items-start pl-4 md:pl-0 md:items-start flex-col md:flex-row md:justify-between  gap-3 mt-6">
          <div className=" flex flex-col py-3 ">
            <img src={assets.logo} className="w-[200px]" alt="" />
            <p className="text-gray-400 my-2 max-w-[400px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Explicabo excepturi doloremque, non incidunt repellat deserunt
              quisquam
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-gray-700 text-2xl mt-6  font-semibold tracking-wider">
              Company
            </h1>
            <p className="mt-3 text-lg text-gray-400">
              <a href="">Home</a>
            </p>
            <p className="mt-3 text-lg text-gray-400">
              <a href="">Shop</a>
            </p>
            <p className="mt-3 text-lg text-gray-400">
              <a href="">About Us</a>
            </p>
            <p className="mt-3 text-lg text-gray-400">
              <a href="">Contact</a>
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-gray-700 text-2xl mt-6  font-semibold tracking-wider">
              Get in touch
            </h1>
            <p className="mt-3 text-lg text-gray-400">
              <a href="">+91 9839403989</a>
            </p>
            <p className="mt-3 text-lg text-gray-400">
              <a href="">ramakrishnanguna2003@gmail.com</a>
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
      </div>
      <div className="w-[100%] flex items-center justify-center py-5 border-t border-gray-400">
        <h1 className="text-gray-500">
          Copyright 2025 © Shopify All Right Reserved.
        </h1>
      </div>
    </>
  );
};
