/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import useCallSeller from "../hooks/useCallSeller";
import ErrorMsg from "../utils/ErrorMsg";
import Loader from "../utils/Loader";
import ProductViews from "../components/modals/ProductViews";
import { NavLink } from "react-router-dom";
import { CounterContext } from "../context/store";

export default function RelatedProducts({ productID, providerType }) {
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { userID } = useContext(CounterContext);

  // const onOpenModal = (product) => {
  //   setSelectedProduct(product);
  //   setModal(true);
  // };

  const closeModal = () => {
    setSelectedProduct(null);
    setModal(false);
  };

  const { mappedProducts, userIsLoading, userIsError } = useCallSeller(
    productID,
    providerType
  );

  if (userIsLoading) return <Loader />;
  if (userIsError) return <ErrorMsg message={userIsError} />;

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 p-3 pb-3 g-4 bg-white rounded rtl-products">
          {mappedProducts && mappedProducts.length > 0 ? (
            mappedProducts?.map((product, index) => (
              <div className="col" key={index}>
                <NavLink
                  to={
                    product.sellerInfo.id === userID
                      ? `/user-profile`
                      : `/seller-profile/${product.sellerInfo.id}`
                  }
                >
                  <div className="card ">
                    {product.price === product.priceAfterDiscount ? (
                      <div
                        className="bg-orange  text-white"
                        style={{
                          position: "absolute",
                          width: "32%",
                          textAlign: "center",
                        }}
                      >
                        لا يوجد خصم
                      </div>
                    ) : (
                      <div
                        className="bg-orange  text-white"
                        style={{
                          position: "absolute",
                          width: "32%",
                          textAlign: "center",
                        }}
                      >
                        بعد الخصم :{product.priceAfterDiscount}
                      </div>
                    )}
                    {/* <div
                      className="bg-orange  text-white"
                      style={{ position: "absolute", width: "30%" }}
                    >
                      بعد الخصم
                      {product.priceAfterDiscount}
                    </div> */}
                    {product.sellerInfo.imageURL ? (
                      <img
                        src={product.sellerInfo.imageURL}
                        alt={product.arName}
                        className="fixing-images"
                      />
                    ) : (
                      <div
                        className="bg-transparent text-dark d-flex justify-content-center"
                        style={{ height: "146px" }}
                      >
                        <span className="text-center">
                          لا يتوفر صوره حتي الان
                        </span>
                      </div>
                    )}
                    <div className="card-body">
                      <div className="d-flex justify-content-between g-4 mb-2">
                        <h6 className="card-title small fw-bold">
                          {product.sellerInfo.arName}
                        </h6>
                        <h6 className="card-title small fw-bold">
                          السعر : {product.price}
                        </h6>
                        <h6 className="card-title small fw-bold">
                          الكميه : {product.stock}
                        </h6>
                      </div>
                      <div className="d-flex justify-content-between g-4">
                        {product.sellerInfo.id !== userID && (
                          <NavLink
                            to={`/buying-process/${productID}/${product.sellerInfo.id}/deal-price/${product.price}/discount-widget/${product.priceAfterDiscount}/product-name/${product.arName}/stock/${product.stock}/seller-name/${product.sellerInfo.arName}`}
                          >
                            <button className="btn askFORprod text-white px-4 py-0 mt-0">
                              اطلب الان
                            </button>
                          </NavLink>
                        )}
                        {/* <button
                        className="btn askFORprod text-white px-4 py-0 mt-0"
                        onClick={() => onOpenModal(product)}
                      >
                        عرض المنتج
                      </button> */}
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))
          ) : (
            <span>لا يوجد بائعين</span>
          )}
        </div>
      </div>
      <ProductViews
        modal={modal}
        closeModal={closeModal}
        mappedProducts={selectedProduct ? [selectedProduct] : []}
        systemProductID={productID}
        type={providerType}
      />
    </>
  );
}
