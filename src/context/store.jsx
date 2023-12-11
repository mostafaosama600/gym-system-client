/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useCheckUserType from "../hooks/useCheckUserType";

export const CounterContext = createContext({});

const CounterContextProvider = (props) => {
  const [loginUser, setLoginUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();

  function getUserInfo() {
    const encodedToken = localStorage.getItem("userToken");
    const userData = jwtDecode(encodedToken);
    setLoginUser(userData);
    setUserID(userData?.id);
  }
  useEffect(function () {
    if (localStorage.getItem("userToken")) {
      getUserInfo();
    }
  }, []);

  function logOut() {
    localStorage.removeItem("userToken");
    setLoginUser(null);
    navigate("/login");
  }

  const userTypeLogin = localStorage.getItem("userTypeLogin");
  const token = localStorage.getItem("userToken");

  const [userTypeData, setUserTypeData] = useState([]);
  const [loadingUserType, setLoadingUserType] = useState(true);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BASE_API_URL}LookUp/GetUsersTypes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserTypeData(data.data);
        setLoadingUserType(false);
      })
      .catch((err) => console.error(err));
  }, [token]);

  // check user type
  const { loading, getUserTypeById } = useCheckUserType();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTypeData = await getUserTypeById(userTypeLogin);
        setUserType(userTypeData);
      } catch (error) {
        console.error(error);
      }
    };

    if (userTypeLogin) {
      fetchData();
    }
  }, [userTypeLogin, getUserTypeById]);

  const value = {
    userTypeLogin,
    getUserInfo,
    loginUser,
    logOut,
    userID,
    userTypeData,
    loadingUserType,
    loading,
    userType,
  };
  return (
    <CounterContext.Provider value={value}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;
