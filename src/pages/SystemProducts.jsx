import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import styles from "../scss/SystemProducts.module.scss";
import Loader from "../utils/Loader";
import ErrorMsg from "../utils/ErrorMsg";
import { useEffect, useState } from "react";
// import OtpInputsPart from "../components/OtpInputsPart";

export default function SystemProducts() {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const {
    isLoading: newProductsLoading,
    isError,
    products: newProducts,
  } = useFetch(`Products/GetAllProducts?start=${(page - 1) * 10}&count=10`);

  useEffect(() => {
    if (newProductsLoading) {
      setIsLoadingMore(true);
    } else if (newProducts.length > 0) {
      setIsLoadingMore(false);
      setAllProducts((prevProducts) => [...prevProducts, ...newProducts]);
    }
  }, [newProductsLoading, newProducts]);

  useEffect(() => {
    if (!newProductsLoading && allProducts.length > 0) {
      setIsLoading(false);
    }
  }, [newProductsLoading, allProducts]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMsg message={isError} />;

  return (
    <div className="container">
      {/* <OtpInputsPart /> */}
      <div className="mb-3" id={`${styles.item1}`}>
        <h5 className="card-title mt-3">المنتجات المتاحه في الموقع</h5>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {allProducts.map((product) => (
          <div className="col" key={product._id}>
            <NavLink
              to={`/product/details/${product._id}`}
              className={`nav-link`}
            >
              <div className="card border rtl-products">
                {product.imageURL ? (
                  <img
                    src={product.imageURL}
                    className={`${styles.productimage}`}
                    alt={product.arName}
                  />
                ) : (
                  <p className="card-text mx-2">
                    {product.arName} - لا يتوفر صوره حتي الان
                  </p>
                )}
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <h5 className="card-title">{product.arName}</h5>
                    <p className="card-text">{product.arDescription}</p>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>

      {allProducts.length > 0 && !isLoadingMore && (
        <div className="mt-3">
          <button className="btn bg-orange text-white " onClick={handleSeeMore}>
            رؤيه المزيد
          </button>
        </div>
      )}
    </div>
  );
}
