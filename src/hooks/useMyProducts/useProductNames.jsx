/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../context/store";

export default function useProductNames() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const { userType } = useContext(CounterContext);

  let userRole;
  if (userType?.arName === "مورِّد") {
    userRole = "GetSupplierProducts";
  } else {
    userRole = "GetFarmProducts";
  }
  const token = localStorage.getItem("userToken");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchProducts() {
        try {
          setIsLoading(true);
          setIsError("");
          const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_API_URL}Products/${userRole}`,
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

          setProducts(data.data);
          setIsError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchProducts();
      return function () {
        controller.abort();
      };
    },
    [token, userRole]
  );

  return { isLoading, isError, products };
}
