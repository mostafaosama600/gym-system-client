import { useState } from "react";
import useGetProfile from "./useGetProfile";

export default function useUpdate() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isErrorUpdating, setIsErrorUpdating] = useState("");
  const { getUserProfileSupplierData, getUserProfileFarmData } =
    useGetProfile();
  const [isSuccessRequest, setIsSuccessRequest] = useState(false);

  const token = localStorage.getItem("userToken");

  async function updateProduct(productId, editing, setEditing) {
    const { _id: supplierId } = getUserProfileSupplierData || {};
    const { _id: farmId } = getUserProfileFarmData || {};

    const productData = editing[productId];

    if (productData && (supplierId || farmId)) {
      setIsUpdating(true);
      setIsErrorUpdating("");

      let url = `${import.meta.env.VITE_APP_BASE_API_URL}Products/${
        supplierId
          ? `UpdateSupplierProduct?id=${supplierId}`
          : `UpdateFarmProduct?id=${farmId}`
      }`;
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productID: productId,
            ...productData,
          }),
        });

        if (!response.ok) {
          throw new Error("حدث خطا");
        }
        setEditing({});
        setIsSuccessRequest(true);
      } catch (err) {
        setIsErrorUpdating(err.message);
      } finally {
        setIsUpdating(false);
      }
    }
  }

  return { updateProduct, isUpdating, isErrorUpdating, isSuccessRequest };
}
