import { useState, useEffect, useContext } from "react";
import { CounterContext } from "../../context/store";

export default function useGetProfile() {
  const { userID } = useContext(CounterContext);
  const [getUserProfile, setGetUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // supplier
  const [getUserProfileSupplierData, setGetUserProfileSupplierData] =
    useState(null);
  // farm
  const [getUserProfileFarmData, setGetUserProfileFarmData] = useState(null);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_APP_BASE_API_URL}Users/GetProfile?id=${userID}`,
      {
        headers: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);

        setGetUserProfile(data.data);
        setGetUserProfileSupplierData(data.data?.supplier);
        setGetUserProfileFarmData(data.data?.farm);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [token, userID]);

  return {
    getUserProfile,
    getUserProfileSupplierData,
    getUserProfileFarmData,
    isLoading,
  };
}
