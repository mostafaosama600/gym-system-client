import { useEffect, useState } from "react";

export default function useGetFatora(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError("");
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("حدث خطأ ما");
        const resData = await response.json();
        if (resData.hasError === true) throw new Error("حدث خطأ ما");

        setData(resData.data);
        setIsError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setIsError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return function () {
      controller.abort();
    };
  }, [token, url]);

  return { isLoading, isError, data };
}
