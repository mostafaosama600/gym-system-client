import { useParams } from "react-router-dom";
import styles from "../scss/DetailsProduct.module.scss";
import { useEffect, useState } from "react";
import ErrorMsg from "../utils/ErrorMsg";
import Loader from "../utils/Loader";
import RelatedProducts from "./RelatedProducts";

export default function DetailsProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
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
            `${
              import.meta.env.VITE_APP_BASE_API_URL
            }Products/GetProductByID/?id=${id}`,
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
          setProduct(data.data);
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
    [id, token]
  );

  return (
    <>
      <div className="container my-4 ">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ErrorMsg message={isError} />
        ) : product ? (
          <div className="card border-0 my-5 p-3" style={{ maxWidth: "100%" }}>
            <div className="row g-5 mt-0">
              <div className="col-md-4">
                {product.imageURL ? (
                  <div className="w-100 h-100">
                    <img
                      src={product.imageURL}
                      className={`w-100 h-75 ${styles.productimage}`}
                      alt={product.arName}
                    />
                  </div>
                ) : (
                  <div className="card-text d-flex justify-content-center h-100 w-100 mx-2">
                    {product.arName} - لا يتوفر صوره حتي الان
                  </div>
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title mb-5">{product.arName}</h5>
                  <p className="card-text mb-2">{product.arDescription}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span>لا يوجد منتجات متاحه</span>
        )}
      </div>
      <RelatedProducts
        productID={product._id}
        providerType={product.providerType}
      />
    </>
  );
}
