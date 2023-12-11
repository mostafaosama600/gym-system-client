/* eslint-disable react/prop-types */
import Button from "../../utils/Button";
import useAddOutOfSystem from "../../hooks/useMyProducts/useAddOutOfSystem";
import UploadImage from "../UploadImage";
import useFetch from "../../hooks/useFetch";

export default function AddProductOutOfSystem() {
  const {
    productOutSystem,
    setProductOutSystem,
    isLoading,
    isError,
    addProductOutOfSystem,
  } = useAddOutOfSystem();

  const { products: category } = useFetch(`Products/GetAllCategories`);

  function handleInputChange(e) {
    e.persist();
    setProductOutSystem({
      ...productOutSystem,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addProductOutOfSystem();
  }

  const handleImageUpload = (imageURL) => {
    setProductOutSystem({
      ...productOutSystem,
      imageURL: imageURL,
    });
  };

  return (
    <>
      <div className="row mx-3 p-2 ">
        <form className="mx-3 p-2" onSubmit={handleSubmit}>
          <div className="row g-3 my-4">
            <div className="col-md-6">
              <label className="form-label">وصف المنتج</label>
              <input
                maxLength={50}
                type="text"
                className="form-control border"
                placeholder="وصف المنتج"
                name="arDescription"
                value={productOutSystem?.arDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">اسم المنتج</label>
              <input
                type="text"
                className="form-control border"
                placeholder="اسم المنتج"
                name="arName"
                value={productOutSystem?.arName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">الصنف</label>
              <select
                className="form-select border rtl-products"
                value={productOutSystem.category}
                onChange={handleInputChange}
                name="category"
              >
                <option value="" disabled>
                  اختر الصنف
                </option>
                {category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.arName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">اضافه صوره</label>
              <UploadImage onImageUpload={handleImageUpload} />
            </div>

            <div className="col-md-6">
              <label className="form-label">سعر البيع الخاص بك</label>
              <input
                type="text"
                className="form-control border"
                placeholder="سعر البيع الخاص بك"
                name="price"
                value={productOutSystem.price}
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
                value={productOutSystem?.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button type="mainBtn">{isLoading ? "جاري" : "اضافه المنتج"}</Button>
          {isError && <div className="alert alert-danger w-50">{isError}</div>}
        </form>
      </div>
    </>
  );
}
