import { useContext, useEffect, useState } from "react";
import { CounterContext } from "../context/store";

export default function useCallSeller(productID, providerType) {
  const [data, setData] = useState({
    mappedProducts: [],
    sellerInfo: {},
  });
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [userIsError, setUserIsError] = useState("");

  const { userTypeData } = useContext(CounterContext);

  const [supplierUserType, setSupplierUserType] = useState("");
  const [farmUserType, setFarmUserType] = useState("");
  const [clientUserType, setClientUserType] = useState("");

  useEffect(() => {
    let types = userTypeData.map((e) => e?._id);
    setSupplierUserType(types[0]);
    setFarmUserType(types[1]);
    setClientUserType(types[2]);
  }, [userTypeData]);

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    let controller;

    async function fetchRelatedProducts() {
      setUserIsLoading(true);
      setUserIsError("");

      if (farmUserType && supplierUserType && productID && providerType) {
        let url = `${import.meta.env.VITE_APP_BASE_API_URL}Users/${
          supplierUserType === providerType
            ? "GetProductSuppliers"
            : "GetProductFarms"
        }?id=${productID}`;
        try {
          controller = new AbortController();
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          });
          if (!response.ok) throw new Error("حدث خطا");
          const responseData = await response.json();
          if (responseData.hasError === true) throw new Error("حدث خطأ ما");

          let mappedData = [];

          if (responseData.data) {
            for (let u of responseData.data) {
              let userType = u.type;
              let userID = u._id;

              let sellerInfo = {
                id: userID,
                arName: u.arName,
                arDescription: u.arDescription,
                phone: u.phone,
                state: u.state,
                region: u.region,
                imageURL: u.imageURL,
              };

              let products = Array.isArray(u?.supplier?.products)
                ? u.supplier.products
                : Array.isArray(u?.farm?.products)
                ? u.farm.products
                : [];

              mappedData.push(
                ...products
                  .filter(
                    (p) =>
                      p.product.providerType === userType &&
                      p.product?._id === productID
                  )
                  .map((p) => ({
                    id: p._id,
                    arName: p.product.arName,
                    imageURL: p.product.imageURL,
                    price: p.price,
                    priceAfterDiscount: p.priceAfterDiscount,
                    stock: p.stock,
                    qty: p.qty,
                    sellerInfo: sellerInfo,
                  }))
              );
            }
          }

          setData({
            mappedProducts: mappedData,
            sellerInfo: {}, // Provide the default value if needed
          });

          setUserIsError("");
        } catch (err) {
          console.error(err);
          setUserIsError(err.message);
        } finally {
          setUserIsLoading(false);
        }
      }
    }

    fetchRelatedProducts();

    return function cleanup() {
      if (controller) {
        controller.abort();
      }
    };
  }, [farmUserType, productID, providerType, supplierUserType, token]);

  return {
    ...data,
    userIsLoading,
    userIsError,
    clientUserType,
    supplierUserType,
  };
}
