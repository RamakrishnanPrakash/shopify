import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [user, setUser] = useState({
    email: "",
    createdAt: "",
    image: "",
    cart: [],
  });

  const [isLoginComponent, setIsLoginComponent] = useState(true);

  const [isLogin, setIsLogin] = useState(false);
  const getCretentials = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v0/user/get`, {
        withCredentials: true,
      });

      console.log(response);
      if (!response.data.success && !response.data.loggedIn)
        return setIsLogin(false);

      if (response.data.success && response.data.loggedIn) {
        setIsLogin(true);
        setUser(response.data.user);
        return;
      }
    } catch (error) {
      console.log(error.message);
      setIsLogin(false);
    }
  };
  useEffect(() => {
    getCretentials();
  }, [isLogin]);

  // console.log(isLogin);
  const ContextValue = {
    isLoginPage,
    setIsLoginPage,
    isLogin,
    setIsLogin,
    user,
    setUser,
    isLoginComponent,
    setIsLoginComponent,
  };
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
