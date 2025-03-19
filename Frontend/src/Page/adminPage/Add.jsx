import { useEffect, useState } from "react";
import { assets, BACKEND_URL } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

export const Add = () => {
  const [imagesInput, setImagesInput] = useState([
    {
      id: "image-1",
      isimage: false,
      src: assets.upload_img,
    },
    {
      id: "image-2",
      isimage: false,
      src: assets.upload_img,
    },
    {
      id: "image-3",
      isimage: false,
      src: assets.upload_img,
    },
    {
      id: "image-4",
      isimage: false,
      src: assets.upload_img,
    },
  ]);

  const handleChange = (e, id) => {
    setImagesInput((prevImages) =>
      prevImages.map((img) =>
        img.id === id ? { ...img, src: e.target.files[0], isimage: true } : img
      )
    );
  };

  let categories = [
    "Loptop",
    "Mobilephone",
    "Watch",
    "Headphone",
    "Earphone",
    "Camera",
    "Speaker",
    "Accesscerios",
  ];

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    price: "",
    offerPrice: "",
    categories: "Loptop",
    images: [],
  });

  /*
  handle this useState once you can button click
  button has disabled because we prevent continious button 
  click.
   */

  const [isUploading, setUploading] = useState(false);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserInput((prev) => ({ ...prev, [name]: value }));
    return;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // setUploading(true);
    console.log("Uploading ");
    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("price", userInput.price);
    formData.append("offerPrice", userInput.offerPrice);
    formData.append("categories", userInput.categories);
    for (let i = 0; i < imagesInput.length; i++) {
      formData.append("images", imagesInput[i].src);
    }

    // console.log(...formData);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v0/admin/product/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg || "Product added successfully");
        setUserInput({
          title: "",
          description: "",
          price: "",
          offerPrice: "",
          categories: "Loptop",
          images: [],
        });

        setImagesInput((prev) =>
          prev.map((item) => ({
            ...item,
            isimage: false,
            src: assets.upload_img,
          }))
        );
        return;
      }
    } catch (error) {
      toast.error(error.message || "Data was not added");
    } finally {
      setUploading(false);
    }
  };
  useEffect(() => console.log(imagesInput), [imagesInput]);
  return (
    <div className="flex-1">
      <div className="w-[80%] xl:w-[600px] pl-10 pt-10 text-gray-800">
        <form onSubmit={formSubmitHandler}>
          <h5 className="mb-2 ">Product image</h5>
          <div className="flex gap-3 flex-wrap">
            {imagesInput.map((item, index) => (
              <label htmlFor={item.id} key={item.id}>
                <input
                  type="file"
                  className="hidden"
                  id={item.id}
                  onChange={(e) => handleChange(e, item.id)}
                />
                <div
                  className={`${
                    item.isimage
                      ? "w-16 lg:w-32 h-16 lg:h-32  p-2 flex items-center justify-center overflow-hidden border border-gray-400"
                      : "p-0 border-0"
                  }`}>
                  <img
                    src={
                      item.isimage ? URL.createObjectURL(item.src) : item.src
                    }
                    alt=""
                    className={`w-28 cursor-pointer `}
                    id={item.id}
                    required
                  />
                </div>
              </label>
            ))}
          </div>
          <div className=" ">
            <label
              htmlFor="title"
              className=" transition-colors focus-within:font-bold flex gap-3 flex-col mt-3">
              Product name
              <input
                type="text"
                name="title"
                id="title"
                className="outline-0 border border-gray-400 py-2 text-md  px-3 rounded-lg focus:border-orange-500 focus:font-medium"
                placeholder="Type here"
                onChange={onChangeHandler}
                required
                value={userInput.title}
              />
            </label>
          </div>
          <div className=" ">
            <label
              htmlFor="title"
              className=" transition-colors focus-within:font-bold flex gap-3 flex-col mt-3">
              Product description
              <textarea
                type="text"
                name="description"
                id="title"
                rows={3}
                className="outline-0 border border-gray-400 py-2 text-md  px-3 rounded-lg focus:border-orange-500 focus:font-medium"
                placeholder="Type here"
                onChange={onChangeHandler}
                required
                value={userInput.description}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label
              htmlFor="categories"
              className=" transition-colors focus-within:font-bold flex gap-3 flex-col mt-3">
              Categories
              <select
                name="categories"
                id="categories"
                value={userInput.categories}
                className="outline-0 border border-gray-400 py-2 px-3 pr-7 focus:border-orange-500 focus:font-medium"
                onChange={onChangeHandler}>
                {categories.map((categorie) => (
                  <option key={categorie} value={categorie}>
                    {categorie}
                  </option>
                ))}
              </select>
            </label>
            <label
              htmlFor="title"
              className=" transition-colors focus-within:font-bold flex gap-3 flex-col mt-3">
              Product Price
              <input
                type="number"
                value={userInput.price}
                name="price"
                id="title"
                required
                className="outline-0 border border-gray-400 py-2 text-md appearance-none focus:border-orange-500 focus:font-medium  px-3 "
                placeholder="0"
                onChange={onChangeHandler}
              />
            </label>
            <label
              htmlFor="title"
              className=" transition-colors focus-within:font-bold flex gap-3 flex-col mt-3">
              Offer Price
              <input
                type="number"
                name="offerPrice"
                id="title"
                required
                className="outline-0 border border-gray-400 py-2 text-md appearance-none focus:border-orange-500 focus:font-medium  px-3 "
                placeholder="0"
                onChange={onChangeHandler}
                value={userInput.offerPrice}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={isUploading}
            className="my-2 py-2 px-5 text-white bg-orange-500 rounded-md flex items-center gap-2 justify-center">
            ADD <span className=" text-xl"> ➔</span>
          </button>
        </form>
      </div>
    </div>
  );
};
