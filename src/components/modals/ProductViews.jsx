import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";

export default function ProductViews({
  modal,
  closeModal,
  mappedProducts,
  systemProductID,
}) {
  return ReactDOM.createPortal(
    modal && (
      <div className="model">
        <div className="overlay" onClick={closeModal}></div>

        <div className="modal-content rtl-products">
          <div className="mt-1">
            {mappedProducts && mappedProducts.length > 0 ? (
              mappedProducts?.map((product, index) => (
                <div key={index}>
                  <div className="d-flex justify-content-between mb-4">
                    <NavLink to={`/seller-profile/${product.sellerInfo.id}`}>
                      {product.sellerInfo.imageURL ? (
                        <img
                          src={product.sellerInfo.imageURL}
                          style={{
                            marginTop: "-7px",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                          alt="حساب البائع"
                        />
                      ) : (
                        <div>
                          <span
                            style={{
                              marginTop: "-7px",
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              background: "#f25f2d",
                              display: "inline-block",
                            }}
                          ></span>
                        </div>
                      )}
                    </NavLink>
                    <h5 className="card-title mt-2">تفاصيل المنتج والبائع</h5>

                    <button
                      className="btn border px-2 py-0 bg-dark text-white"
                      onClick={closeModal}
                    >
                      اغلاق
                    </button>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>اسم البائع -{product.sellerInfo.arName}</p>
                    <p>
                      الولايه-
                      {product.sellerInfo.region}
                    </p>
                    <p>الدوله- {product.sellerInfo.state}</p>
                  </div>

                  <div
                    className="row row-cols-1 row-cols-md-1 mt-2 g-4 "
                    style={{
                      overflow: "auto",
                      maxHeight: "300px",
                    }}
                  >
                    <div className="card mb-3 p-1">
                      <div className="row g-0">
                        <div className="col-md-7">
                          <div className="card-body">
                            <h6 className="card-title fw-bold">
                              {product.arName}
                            </h6>
                            <h6 className="card-title fw-bold">
                              سعر البيع : {product.price}
                            </h6>
                            <h6 className="card-title fw-bold">
                              الخصم : {product.priceAfterDiscount}
                            </h6>
                            <p className="card-text">
                              الكميه المتاحه: {product.stock}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <img
                            src={product?.imageURL}
                            className="img-fluid h-100 w-100 rounded-start"
                            alt={product?.arName}
                          />
                        </div>
                      </div>
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={`/buying-process/${systemProductID}/${product.sellerInfo.id}/deal-price/${product.price}/discount-widget/${product.priceAfterDiscount}/product-name/${product.arName}/stock/${product.stock}/seller-name/${product.sellerInfo.arName}`}
                      >
                        <button className="btn bg-orange text-white d-flex justify-content-center w-25">
                          شراء الان
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span>حدث عطل</span>
            )}
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal-root")
  );
}
