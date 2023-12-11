import { useEffect, useState } from "react";

export default function useFetch(endpoint) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const token = localStorage.getItem("userToken");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchProducts() {
        try {
          setIsLoading(true);
          setIsError("");
          const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_API_URL}${endpoint}`,
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
    [endpoint, token]
  );

  return { isLoading, isError, products };
}
