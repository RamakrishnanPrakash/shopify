import { useContext, useEffect, useRef, useState } from "react";
import { assets, BACKEND_URL, STRIPE_PUBLIC_KEY } from "../assets/assets";
import { Navbar } from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { StoreContext } from "../Context/StoreContext";
import { Payment } from "./Payment";
import { loadStripe } from "@stripe/stripe-js";

export const Card = () => {
  const { user, isLoginPage, setUser } = useContext(StoreContext);
  // console.log(user);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);
  const [addressContainer, setAddressContainer] = useState(false);
  const [removeContainer, setRemoveContainer] = useState(false);
  const [removeCartData, setRemoveCartData] = useState({
    id: "",
    isRemove: false,
  });
  const [option, setOption] = useState({
    cashOnDelivery: true,
    onlinePayment: false,
  });

  const [selectedData, setSelectedData] = useState({});
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v0/user/all/card`, {
        withCredentials: true,
      });
      if (response.data.success) {
        if (response.data.carts.length == 0) return setLoading(true);
        setCartData(response.data.carts);
        setSelectedData({ id: response.data.carts[0]._id });
        console.log(response.data.carts);
        setLoading(false);
        return;
      }
    } catch (error) {
      toast.error(`Error:${error.message}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e, id, index) => {
    console.log(e.target.value);
  };
  // console.log(selectedData);
  const removeCart = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v0/user/cart/${removeCartData.id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setCartData(response.data.carts);
        setUser((prev) => ({ ...prev, ["cart"]: response.data.carts }));
        setRemoveContainer(false);
        toast.success("Product removed succesfully");
        return;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Here i have created debouncing technic avoid multiple api call

  let timerRef = useRef(null);
  const increseQuantity = async (index, id) => {
    setCartData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      const response = await axios.put(
        `${BACKEND_URL}/api/v0/user/update/card`,
        { id: cartData[index]._id, quantity: cartData[index].quantity + 1 },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        await fetchData();
        toast.success("Your cart items updated");
      }
    }, 1000);
  };

  const decreseQuantity = async (index) => {
    console.log("CLICKS");
    setCartData((prev) =>
      prev.map((item, i) =>
        index == i && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    clearTimeout(timerRef.current);
    if (cartData[index].quantity !== 1) {
      timerRef.current = setTimeout(async () => {
        const response = await axios.put(
          `${BACKEND_URL}/api/v0/user/update/card`,
          { id: cartData[index]._id, quantity: cartData[index].quantity - 1 },
          { withCredentials: true }
        );
        console.log(response);
        if (response.data.success) {
          await fetchData();
          toast.success("Your cart items updated");
        }
      }, 1000);
    }
  };

  const [finalProductList, setFinalProductList] = useState({
    productId: "",
    price: 0,
    quantity: 0,
  });
  useEffect(() => {
    const data = cartData.find((product) => product._id === selectedData.id);
    if (data)
      setFinalProductList({
        productId: data._id,
        price: data.productId.offerPrice,
        quantity: data.quantity,
      });
  }, [selectedData]);

  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (user?.addresss && user.addresss.length > 0) {
      setAddress(
        `${user.addresss[0].name} ${user.addresss[0].addresss} ${user.addresss[0].state} ${user.addresss[0].pincode}`
      );
    }
  }, [user]);

  const setAddressState = (_id) => {
    const data = user.addresss.find((item) => item._id == _id);
    setAddress(`${data.name} ${data.addresss} ${data.state} ${data.pincode}`);
    setAddressContainer(false);
  };

  const placeOrder = async () => {
    if (address == null || address.length <= 0)
      return toast.error("Please add your delivery address", {
        position: "top-right",
      });
    if (option.cashOnDelivery) {
      setButtonIsLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v0/order/cod`,
        finalProductList,
        { withCredentials: true }
      );
      // console.log(response);
      if (response.data.success) {
        setButtonIsLoading(false);
        return window.location.replace(response.data.url);
      }
    }
    if (option.onlinePayment) {
      setButtonIsLoading(true);
      const data = cartData.find(
        (item) => item._id == finalProductList.productId
      );
      console.log(data);
      const stripe = await loadStripe(`${STRIPE_PUBLIC_KEY}`);
      const response = await axios.post(
        `${BACKEND_URL}/api/v0/order/payment/check-out-session`,
        { data: data },
        { withCredentials: true }
      );
      console.log(response);
      const session = response.data.sessionId;
      setButtonIsLoading(false);
      const result = stripe.redirectToCheckout({ sessionId: session });
      console.log(result);
    }
  };

  return (
    <div className="flex justify-center flex-col lg:flex-row">
      <div className="w-[100%] xl:w-[60%]  py-4 px-2 md:px-16 ">
        <div className="flex items-center justify-between border-b  border-gray-400 pb-5">
          <h1 className="text-4xl font-semibold  text-gray-600">
            Your <span className="text-orange-500">Cart</span>
          </h1>
          {loading ? <p>0 Items</p> : <p>{`${cartData.length} Items`} </p>}
        </div>

        {loading || cartData.length == 0 ? (
          <div className="w-full h-[40vh] flex items-center justify-center   flex-col">
            <img src={assets.empty_box} className="w-32 mb-3" alt="" />
            <h1 className="text-2xl text-gray-400 tracking-wider">
              cart item's empty
            </h1>
          </div>
        ) : (
          <>
            <table className="w-full mt-5 text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-gray-800 text-lg py-3 ">
                    Product Details
                  </th>
                  <th className="text-gray-800 text-lg py-3 px-4">Price</th>
                  <th className="text-gray-800 text-lg py-3 px-4 text-center">
                    Quantity
                  </th>
                  <th className="text-gray-800 text-lg py-3 px-4">Subtotal</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {cartData.map((item, index) => (
                  <tr
                    onClick={() => {
                      console.log("click");
                      setSelectedData({ id: item._id });
                    }}
                    className={`border-b  cursor-pointer ${
                      item._id === selectedData.id
                        ? "bg-orange-100"
                        : "border-gray-200"
                    }`}
                    key={item._id}>
                    <td className="py-4">
                      <div className="flex gap-2 items-center">
                        <div className="w-16 h-16 ml-1  flex items-center justify-center rounded-md bg-gray-200 overflow-hidden">
                          <img
                            src={`${BACKEND_URL}/uploads/${item.productId.images[0]}`}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-gray-500">
                          <p className="hidden md:block max-w-[300px] overflow-hidden text-sm md:text-md">
                            {item.productId.name.length > 15
                              ? item.productId.name.slice(0, 17)
                              : item.productId.name}
                          </p>
                          <p className="block md:hidden max-w-[300px] overflow-hidden text-sm md:text-md">
                            {item.productId.name.length > 7
                              ? item.productId.name.slice(0, 7)
                              : item.productId.name}
                          </p>
                          <button
                            className="text-orange-500 mt-1"
                            onClick={() => {
                              setRemoveContainer(true);
                              setRemoveCartData({
                                id: item._id,
                                isRemove: false,
                              });
                            }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className=" text-sm py-4 px-4 text-gray-500">
                      ${" "}
                      {Intl.NumberFormat("en-In", {
                        currency: "INR",

                        maximumFractionDigits: 0,
                      }).format(Number(item.productId.offerPrice))}
                    </td>
                    <td className="py-4 px-1">
                      <div className="text-gray-500 flex items-center justify-center gap-1">
                        <button
                          disabled={item.quantity === 1}
                          className="text-xl -rotate-90 px-2 py-1"
                          onClick={() => decreseQuantity(index)}>
                          ▲
                        </button>
                        <input
                          type="text"
                          required
                          className="w-8 h-8 text-center outline-none border border-gray-400 rounded-md px-2"
                          value={item.quantity}
                          onChange={(e) => handleChange(e, item._id, index)}
                        />
                        <button
                          className="text-xl rotate-90 px-2 py-1"
                          onClick={() => increseQuantity(index, item._id)}>
                          ▲
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-500">
                      $
                      {Intl.NumberFormat("en-IN", {
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(
                        Number(item.productId.offerPrice) * item.quantity
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <div className="w-[100%] xl:w-[40%] flex  items-center lg:justify-start flex-col">
        <div className="bg-gray-100/80 py-2 px-6 mt-5 w-[90%] md:w-[75%]">
          <h1 className="text-2xl text-gray-800 pb-2 border-b font-bold border-gray-300">
            Order Summary
          </h1>

          <div className=" w-full">
            <p className="text-gray-800 my-2">SELECT ADDRESS</p>
            <div className="flex bg-white px-2 border border-gray-300 rounded-sm relative">
              <input
                type="text"
                placeholder="Add your address"
                className="w-full outline-0 p-2"
                onFocus={() => setAddressContainer(true)}
                value={address}
                required
                // onBlur={() => setAddressContainer(false)}
              />
              <button
                className={`${addressContainer ? "rotate-90" : ""}`}
                onClick={() => setAddressContainer(!addressContainer)}>
                <svg
                  className="w-5 h-5 inline float-right transition-transform duration-200 -rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#6B7280">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <div
                className={`${
                  addressContainer ? "absolute" : "hidden"
                } w-full  py-2 bg-white  top-14 border border-gray-300 rounded-sm left-0`}>
                <div className="w-full p-2 px-5 duration-700 flex flex-col max-h-40 ">
                  {user?.addresss?.map(
                    ({ name, phoneNumber, pincode, state, addresss, _id }) => (
                      <button
                        className=" tracking-wider py-1"
                        key={_id}
                        onClick={() => setAddressState(_id)}>
                        {`${name} ${addresss} ${state} ${pincode} ${phoneNumber}`.slice(
                          0,
                          22
                        )}
                        ...
                      </button>
                    )
                  )}
                  <button
                    className="text-center mt-1 bg-orange-500 w-[60] py-1 text-white"
                    onClick={() => window.location.replace("/address")}>
                    + Add New Address
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full pb-4 border-b border-gray-300">
            <p className="text-gray-800 my-2 mt-3">PROMO CODE</p>
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full outline-0 p-2 px-2 border border-gray-300 rounded-sm"
            />
            <button className="py-1 px-5 text-lg  bg-orange-500 rounded-sm text-white mt-4 ">
              Apply
            </button>
          </div> */}
          <div className="flex flex-col w-full gap-2 mt-3">
            <div className="flex justify-between items-center my-2">
              <p className="text-lg text-gray-600">Price</p>
              <p className="text-lg text-gray-600 font-bold">
                {`$ ${Intl.NumberFormat("en-IN", {
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(finalProductList.price)}`}{" "}
                <span className="text-sm font-medium text-orange-500">
                  {" "}
                  X {finalProductList.quantity}
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center my-1">
              <p className=" text-gray-600">Shipping Fee </p>
              <p className=" text-gray-600 font-bold">Free</p>
            </div>
            <div className="flex justify-between items-center my-1">
              <p className=" text-gray-600">{"Tax(2%)"} </p>
              <p className=" text-gray-600 font-bold">$ 123 </p>
            </div>
            <div className="flex justify-between items-center my-2 ">
              <p className=" text-xl text-gray-600 font-bold"> Total</p>
              <p className=" text-xl text-gray-600 font-bold">{`$ ${Intl.NumberFormat(
                "en-IN",
                {
                  currency: "INR",
                  maximumFractionDigits: 0,
                }
              ).format(
                finalProductList.price * finalProductList.quantity + 123
              )}`}</p>
            </div>

            <Payment
              selectedData={selectedData}
              finalProductList={finalProductList}
              option={option}
              setOption={setOption}
            />

            {buttonIsLoading ? (
              <>
                <button className="bg-orange-500 py-3 rounded-sm w-full flex items-center justify-center">
                  <p className="w-[20px] h-[20px] rounded-full border-[4px] border-t-gray-800 animate-spin-fast border-white/80"></p>
                  <p className="ml-2 text-lg text-white">
                    processing please wait..
                  </p>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={placeOrder}
                  className="w-full py-2 text-center bg-orange-500 text-white rounded-sm">
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          removeContainer ? "fixed" : "hidden"
        } top-1/2 left-1/2 w-[280px]  -translate-x-1/2
       -translate-y-1/2 p-6 bg-gray-100 border border-gray-300 
       rounded-lg z-40`}>
        <h1 className="text-xl font-bold py-1 text-center text-gray-600">
          Are you sure romove?{" "}
        </h1>
        <div className=" flex w-full gap-2 mt-3">
          <button
            className="outline-0 text-center w-1/2 py-2 border border-gray-300 rounded-md"
            onClick={() => {
              setRemoveContainer(false);
            }}>
            Cancel
          </button>
          <button
            className="outline-0 text-center w-1/2 py-2 bg-orange-500 text-white rounded-md"
            onClick={() => removeCart()}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
