import { useEffect, useState } from "react";
import { assets, BACKEND_URL } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

export const Address = () => {
  const [address, setAddress] = useState({
    name: "",
    phoneNo: "",
    pincode: "",
    address: "",
    state: "",
  });
  const state = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name === "phoneNo", !Number(value));
    if (name == "phoneNo" && !/^\d+$/.test(value)) {
      value.length == 0
        ? setAddress((prev) => ({ ...prev, ["phoneNo"]: "" }))
        : setAddress((prev) => ({ ...prev }));
      return;
    }
    if (name == "pincode" && !Number(value)) {
      value.length == 0
        ? setAddress((prev) => ({ ...prev, ["pincode"]: "" }))
        : setAddress((prev) => ({ ...prev }));
      return;
    }

    return setAddress((prev) => ({ ...prev, [name]: value }));
  };
  const onClickHandler = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v0/user/add/address`,
        {
          address,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        setAddress({
          name: "",
          phoneNo: "",
          pincode: "",
          address: "",
          state: "",
        });
        toast.success("Your address added", { position: "top-right" });

        setTimeout(() => window.location.replace("/card"), 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Network issue", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    console.log(address);
  }, [address]);
  return (
    <div className="w-11/12 mx-auto  px-10 flex  flex-col lg:flex-row items-center justify-evenly gap-14">
      <div className="w-[400px] mt-8">
        <h1 className="text-gray-500 text-3xl font-bold  mb-4">
          Add Shipping <span className="text-orange-500">Address</span>
        </h1>

        <div className="flex w-[100%]  flex-col gap-4 ">
          <input
            type="text"
            className=" w-full py-2 px-3 text-lg  text-gray-500 outline-0 border border-gray-300 rounded-sm focus:border-orange-500"
            placeholder="Full name"
            name="name"
            id=""
            onChange={onChangeHandler}
            value={address.name}
          />
          <input
            type="text"
            className=" w-full py-2 px-3 text-lg  text-gray-500 outline-0 border border-gray-300 rounded-sm focus:border-orange-500"
            placeholder="Phone number"
            name="phoneNo"
            value={address.phoneNo}
            onChange={onChangeHandler}
            id=""
          />
          <input
            type="text"
            className=" w-full py-2 px-3 text-lg  text-gray-500 outline-0 border border-gray-300 rounded-sm focus:border-orange-500"
            placeholder="Pincode"
            name="pincode"
            value={address.pincode}
            onChange={onChangeHandler}
            id=""
          />

          <textarea
            name="address"
            value={address.address}
            onChange={onChangeHandler}
            id=""
            className="w-full py-2 px-3 text-lg  text-gray-500 outline-0 border border-gray-300 
            rounded-sm focus:border-orange-500"
            placeholder="Address (Area & Street)"
            rows={4}></textarea>

          <select
            name="state"
            id="district"
            value={address.state}
            onChange={onChangeHandler}
            className=" w-full py-2 px-3 text-lg h-12  text-gray-500 outline-0 border border-gray-300 rounded-sm focus:border-orange-500">
            {state.map((state) => (
              <option key={state} className="" value={state}>
                {state}
              </option>
            ))}
          </select>

          <button
            onClick={onClickHandler}
            className="bg-orange-500 text-white py-2 text-lg text-center outline-0 rounded-sm">
            Save Address
          </button>
        </div>
      </div>
      <div className=" mt-8 py-5 pb-10">
        <img src={assets.address_img} alt="" />
      </div>
    </div>
  );
};
