import useAdd from "../../hooks/useMyProducts/useAdd";
import useProductNames from "../../hooks/useMyProducts/useProductNames";
import Button from "../../utils/Button";
import Loader from "../../utils/Loader";
import ErrorMsg from "../../utils/ErrorMsg";
import AddProductOutOfSystem from "./AddProductOutOfSystem";
import { useState } from "react";

export default function AddUserProducts() {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  const {
    addProduct,
    productInformations,
    setProductInformations,
    isLoadingDurAddition,
    errorDurAddition,
    isSuccessRequest,
  } = useAdd();
  const { isLoading, isError, products } = useProductNames();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMsg message={isError} />;

  function handleInputChange(e) {
    e.persist();
    setProductInformations({
      ...productInformations,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addProduct();
  }

  return (
    <div className="container bg-white me-3 p-1">
      <div className="text-right me-0">
        {!show ? (
          <h5>اضافه منتج جديد من منتجات الموقع</h5>
        ) : (
          <h5>اضف منتجك الخاص</h5>
        )}
      </div>
      {!show && (
        <form className="mx-3 p-2" onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-12">
              <select
                className="form-select py-3 mt-4 rtl-products"
                onChange={(event) => {
                  const [productId, categoryId] = event.target.value.split(",");
                  setProductInformations((prevState) => ({
                    ...prevState,
                    productID: productId,
                    categoryID: categoryId,
                  }));
                }}
              >
                <option>افتح النافذه لاختيار المنتج</option>

                {products.map((product, index) => (
                  <option
                    key={index}
                    value={`${product._id},${product.category}`}
                  >
                    {product.arName} - {product.arDescription}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">سعر البيع الخاص بك</label>
              <input
                type="text"
                className="form-control border"
                placeholder="سعر البيع الخاص بك"
                name="price"
                value={productInformations.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">الكميه المتاحه في مخزنك</label>

              <input
                type="text"
                className="form-control border"
                placeholder="الكميه المتاحه في مخزنك"
                name="stock"
                value={productInformations?.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button type="mainBtn">
            {isLoadingDurAddition ? "جاري" : "اضافه المنتج"}
          </Button>
          {errorDurAddition && (
            <div className="alert alert-danger w-50">{errorDurAddition}</div>
          )}
          {isSuccessRequest && (
            <div className="alert alert-success">تم الارسال بنجاح</div>
          )}
        </form>
      )}
      <div className="mx-3 p-2">
        {!show ? (
          <button className="btn border text-dark" onClick={handleShow}>
            افتح النافذه اذا كنت تريد اضافه منتج خاص بك
          </button>
        ) : (
          <button className="btn border text-dark" onClick={handleShow}>
            الغاء
          </button>
        )}
      </div>
      {show && <AddProductOutOfSystem />}
    </div>
  );
}
