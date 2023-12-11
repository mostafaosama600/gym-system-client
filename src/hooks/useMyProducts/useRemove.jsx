import { useState } from "react";
import useGetProfile from "./useGetProfile";

export default function useRemove() {
  const { getUserProfileSupplierData, getUserProfileFarmData } =
    useGetProfile();

  const [loadingDuringDelete, setLoadingDuringDelete] = useState(false);
  const [errorDuringDelete, setErrorDuringDelete] = useState(null);

  const token = localStorage.getItem("userToken");

  async function deleteMyProduct(productId) {
    const { _id: supplierId } = getUserProfileSupplierData || {};
    const { _id: farmId } = getUserProfileFarmData || {};
    if (supplierId || farmId || productId) {
      setLoadingDuringDelete(true);
      setErrorDuringDelete(null);
      let url = `${import.meta.env.VITE_APP_BASE_API_URL}Products/${
        supplierId
          ? `RemoveSupplierProduct?supplierID=${supplierId}`
          : `RemoveFarmProduct?farmID=${farmId}`
      }&productID=${productId}`;

      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorDuringDelete(errorData.msg || "حدث خطا");
        }
      } catch (err) {
        setErrorDuringDelete(err.message || "A network issue occurred");
      } finally {
        setLoadingDuringDelete(false);
      }
    }
  }

  return {
    deleteMyProduct,
    loadingDuringDelete,
    errorDuringDelete,
  };
}
