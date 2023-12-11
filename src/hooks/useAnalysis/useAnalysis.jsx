import { useState } from "react";

const useAnalysis = (fromTo, apiUrl) => {
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const token = localStorage.getItem("userToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fromTo),
      });

      if (!response.ok) throw new Error("حدث خطأ ما");
      const data = await response.json();
      if (data.hasError === true) throw new Error("حدث خطأ ما");
      setDataAnalysis(data.data);
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, isError, dataAnalysis, handleSubmit };
};

export default useAnalysis;
