/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import useGetProfile from "./useGetProfile";

export default function useGet(endpoint) {
  const [getMyProducts, setGetMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { getUserProfileSupplierData, getUserProfileFarmData } =
    useGetProfile();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMyProducts(userId, userRole) {
      if (userId && userRole) {
        try {
          setIsLoading(true);
          setIsError("");
          const response = await fetch(
            `${
              import.meta.env.VITE_APP_BASE_API_URL
            }Users/${userRole}?id=${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            }
          );

          if (!response.ok) throw new Error("حدث خطأ ما");

          const data = await response.json();
          if (data.hasError === true) throw new Error("حدث خطأ ما");
          setGetMyProducts(data.data);
          setIsError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (getUserProfileSupplierData?._id) {
      fetchMyProducts(getUserProfileSupplierData?._id, "GetSupplierProducts");
    } else if (getUserProfileFarmData?._id) {
      fetchMyProducts(getUserProfileFarmData?._id, "GetFarmProducts");
    }
    return () => {
      controller.abort();
    };
  }, [endpoint, getUserProfileFarmData, getUserProfileSupplierData, token]);

  return { isLoading, isError, getMyProducts };
}
