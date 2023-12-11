import { NavLink } from "react-router-dom";
import ErrorMsg from "../utils/ErrorMsg";
import Loader from "../utils/Loader";
import styles from "../scss/SystemProducts.module.scss";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

export default function GetFarmProducts() {
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
  } = useFetch(`Products/GetFarmProducts?start=${(page - 1) * 10}&count=10`);

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

  if (isLoading)
    return (
      <Loader
        style={{
          display: "flex",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      />
    );

  if (isError) return <ErrorMsg message={isError} />;
  return (
    <div className="container">
      <div className="mb-3" id={`${styles.item1}`}>
        <h5 className="card-title mt-3">منتجات المزارع</h5>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {allProducts.map((product) => (
          <div className="col" key={product._id}>
            <NavLink
              to={`/product/details/${product._id}`}
              className={`nav-link`}
            >
              <div className="card border">
                {product.imageURL ? (
                  <img
                    src={product.imageURL}
                    className={` ${styles.productimage}`}
                    alt={product.arName}
                  />
                ) : (
                  <p className="card-text mx-2">
                    {product.arName} - لا يتوفر صوره حتي الان
                  </p>
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.arName}</h5>
                  <p className="card-text">{product.arDescription}</p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>

      {allProducts.length > 0 && !isLoadingMore && (
        <div className="mt-3">
          <button className="btn bg-orange text-white" onClick={handleSeeMore}>
            رؤيه المزيد
          </button>
        </div>
      )}
    </div>
  );
}
