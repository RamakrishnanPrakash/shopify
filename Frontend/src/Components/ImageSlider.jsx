import { imageSliderData, assets } from "../assets/assets.js";

import { useEffect, useRef, useState } from "react";

export const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleSliderClick = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageSliderData.length);
    }, 2000);
  }, []);
  return (
    <div className="w-[95%] md:w-[80%] mx-auto py-10">
      <div className="w-full relative overflow-hidden flex">
        {imageSliderData.map((item, index) => (
          <div
            className="min-w-full  flex flex-row items-center justify-center md:justify-around py-5  px-5 
            bg-[#E6E9F2] cursor-pointer rounded-lg transition-transform duration-700 "
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
            key={index}>
            <div className="px-0 md:px-0">
              <h6 className="text-[#EF7D1A] font-bold my-2">{item.offer}</h6>
              <h1 className="max-w-lg text-[22px]  lg:text-[40px] md:leading-[48px]  text-2xl font-semibold ">
                {item.title}
              </h1>

              <div className=" flex flex-col  sm:flex-row justify-start items-start  gap-5  my-3">
                <button className="bg-[#ef7d1a] w-[150px]   text-white text-md md:text-lg py-2 px-4 rounded-lg sm:rounded-full">
                  {item.buttonText1}
                </button>
                <button className="hidden sm:flex items-center justify-center  w-[150px] gap-2  text-md md:text-lg py-2 px-4 border border-gray-900 rounded-lg sm:rounded-full">
                  <p>{item.buttonText2}</p>
                  <img
                    src={assets.right_arrow}
                    alt={item.buttonText2}
                    className="w-5"
                  />
                </button>
              </div>
            </div>
            <div className="">
              <img src={item.image} alt={item.title} className="w-96 md:w-80" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center flex-row gap-3 my-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            onClick={() => handleSliderClick(index)}
            key={index}
            className={`w-3 h-3 shadow shadow-gray-600 cursor-pointer rounded-full ${
              currentSlide == index ? "bg-[#EF7D1A]" : "bg-[#E6E9F2]"
            }`}></div>
        ))}
      </div>
    </div>
  );
};
