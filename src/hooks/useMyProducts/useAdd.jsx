import { useState } from "react";
import useGetProfile from "./useGetProfile";

export default function useAddProduct() {
  const [productInformations, setProductInformations] = useState({
    productID: "",
    categoryID: "",
    price: "",
    priceAfterDiscount: "",
    stock: "",
  });

  const [isLoadingDurAddition, setIsLoadingDurAddition] = useState(false);
  const [isError, setIsError] = useState("");
  const { getUserProfileSupplierData, getUserProfileFarmData } =
    useGetProfile();
  const [isSuccessRequest, setIsSuccessRequest] = useState(false);

  const token = localStorage.getItem("userToken");

  async function addProduct() {
    const { _id: supplierId } = getUserProfileSupplierData || {};
    const { _id: farmId } = getUserProfileFarmData || {};

    if (supplierId || farmId) {
      setIsLoadingDurAddition(true);
      setIsError("");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_API_URL}Products/${
            supplierId ? "SelectSupplierProduct" : "SelectFarmProduct"
          }?id=${supplierId || farmId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(productInformations),
          }
        );
        if (!response.ok) {
          throw new Error("حدث خطا");
        }

        const data = await response.json();

        if (data.hasError === true) {
          throw new Error("حدث خطا");
        }
        setIsSuccessRequest(true);
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoadingDurAddition(false);
      }
    }
  }

  return {
    productInformations,
    setProductInformations,
    isLoadingDurAddition,
    isError,
    addProduct,
    isSuccessRequest,
  };
}
