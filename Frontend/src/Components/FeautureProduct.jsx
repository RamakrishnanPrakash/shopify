import { assets, featuredProduct } from "../assets/assets";

export const FeautureProduct = () => {
  return (
    <div className="py-10 w-[95%] md:w-[80%] mx-auto">
      <h1
        className=" text-gray-700 font-bold text-2xl lg:text-3xl text-center relative 
    before:content-[''] before:absolute before:w-28 before:h-[2px] before:bg-[#ef7d1a] 
    before:-bottom-2 before:left-1/2 before:-translate-x-1/2">
        Featured Products
      </h1>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center">
        {featuredProduct.map((product, index) => (
          <div
            key={index}
            className="w-[80%] md:w-[300px] h-full md:h-[420px] rounded-lg overflow-hidden relative">
            <img
              src={product.image}
              className="w-full h-full bg-gray-400"
              alt=""
            />
            <div
              className="absolute top-0 left-0 z-20  w-full  h-full md:h-[420px] bg-gray-700/40
             cursor-pointer hover:bg-black/70 duration-700  ease-in-out transition ">
              <div className="w-full h-full flex flex-col  justify-end  items-center py-3 hover:-translate-y-[20px]  duration-700">
                <div className="max-w-[250px] mb-10">
                  <h1 className="text-2xl font-semibold text-white my-1">
                    {product.title}
                  </h1>
                  <h6 className="max-w-[240px] text-white tracking-wider">
                    {product.description}
                  </h6>
                  <button className=" flex items-center gap-2 justify-center my-2 py-1 px-3 text-lg text-white bg-[#ff871d] rounded-lg">
                    <p>Buy now</p>
                    <img
                      src={assets.right_arrow_light}
                      className="w-4"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
