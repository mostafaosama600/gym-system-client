import { useContext, useState } from "react";
import { CounterContext } from "../../context/store";
import { useNavigate } from "react-router-dom";

export default function useAddOutOfSystem() {
  const { userID, userTypeLogin } = useContext(CounterContext);
  const navigate = useNavigate();
  const [productOutSystem, setProductOutSystem] = useState({
    arName: "",
    arDescription: "",
    systemProduct: false,
    imageURL: "",
    category: "",
    providerType: userTypeLogin,
    stock: "",
    price: "",
    priceAfterDiscount: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const token = localStorage.getItem("userToken");

  async function addProductOutOfSystem() {
    if (userID) {
      setIsLoading(true);
      setIsError("");
      if (productOutSystem.imageURL === "")
        setIsError("لا يمكنك اضافه منتج ببيانات غير مكتمله");

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_BASE_API_URL
          }Products/CreateProduct?id=${userID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productOutSystem),
          }
        );

        if (!response.ok) {
          throw new Error("حدث خطا");
        }
        const data = await response.json();
        if (data.hasError === true) throw new Error("حدث خطا");
        navigate("/products");
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return {
    productOutSystem,
    setProductOutSystem,
    isLoading,
    isError,
    addProductOutOfSystem,
  };
}
