import { useParams } from "react-router-dom";
import Loader from "../utils/Loader";
import ErrorMsg from "../utils/ErrorMsg";
import useFetch from "../hooks/useFetch";

export default function User() {
  const { id } = useParams();

  const { isLoading, isError, products } = useFetch(
    `Users/GetProfile?id=${id}`
  );

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
    <div className="container my-3 p-2 bg-white p-2 rounded">
      <div className="text-right mb-0">
        <h5 className="card-title">الوثيقة الشخصية</h5>
      </div>
      {/* row-cols-md-2 */}
      <div className="row row-cols-1 row-cols-md-1 mt-0 g-4 rtl-products">
        <div className="col-4 col-sm-12">
          <div className="card h-100" style={{ width: "100%" }}>
            {products.imageURL ? (
              <img src={products.imageURL} alt={products.arName} />
            ) : (
              <div className="bg-transparent text-dark d-flex justify-content-center w-100 h-100">
                <p className="text-center w-100 h-100">
                  لا يتوفر صورة حتى الآن
                </p>
              </div>
            )}
            <div className="card-body">
              <div className="row row-cols-1 row-cols-md-2 g-1">
                <div className="col">
                  <strong>الاسم - {products.arName}</strong>
                </div>
                <div className="col">
                  <p className="card-text">
                    الوصف -
                    {products.arDescription
                      ? products.arDescription
                      : "لا يتوفر الآن"}
                  </p>
                </div>
                <div className="col">
                  <strong>الدولة - {products.state}</strong>
                </div>
                <div className="col">
                  <strong>المحافظة - {products.region}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-8 col-sm-12">
          <div
            className="row row-cols-1 row-cols-md-2 g-4"
            style={{
              overflow: "auto",
              maxHeight: "375px",
            }}
          >
            {products.supplier && products.supplier.products
              ? products.supplier.products.map((prod, index) => (
                  <div className="col" key={index}>
                    <div className="card" style={{ height: "15rem" }}>
                      <img
                        src={prod.product.imageURL}
                        style={{ width: "100%", height: "10rem" }}
                        alt={prod.product.arName}
                      />
                      <div className="card-body">
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                          <strong className="card-title">
                            {prod.product.arName}
                          </strong>
                          <p className="card-text">
                            {prod.product.arDescription}
                          </p>
                        </div>
                        <NavLink
                          to={`/buying-process/${prod.product._id}/${products._id}/deal-price/${prod.price}/discount-widget/${prod.priceAfterDiscount}/product-name/${prod.product.arName}/stock/${prod.stock}/seller-name/${products.arName}`}
                        >
                          <button className="btn bg-orange text-white">
                            شراء
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))
              : products.farm && products.farm.products
              ? products.farm.products.map((prod, index) => (
                  <div className="col" key={index}>
                    <div className="card" style={{ height: "15rem" }}>
                      <img
                        src={prod.product.imageURL}
                        style={{ width: "100%", height: "10rem" }}
                        alt={prod.product.arName}
                      />
                      <div className="card-body">
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                          <strong className="card-title">
                            {prod.product.arName}
                          </strong>
                          <p className="card-text">
                            {prod.product.arDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div> */}
      </div>
    </div>
  );
}
