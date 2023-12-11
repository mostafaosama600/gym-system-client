/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

import Loader from "../../utils/Loader";
import ErrorMsg from "../../utils/ErrorMsg";

import useRemove from "../../hooks/useMyProducts/useRemove";
import useUpdate from "../../hooks/useMyProducts/useUpdate";
import useGet from "../../hooks/useMyProducts/useGet";

export default function GetUserProducts() {
  const { isLoading, isError, getMyProducts } = useGet();
  const { deleteMyProduct, loadingDuringDelete, errorDuringDelete } =
    useRemove();

  const { updateProduct, isUpdating, isErrorUpdating, isSuccessRequest } =
    useUpdate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleConfirm = () => {
    deleteMyProduct(currentProduct);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleDelete = (productId) => {
    setCurrentProduct(productId);
    setModalOpen(true);
  };

  const [editing, setEditing] = useState({});
  const cancelEdit = () => {
    setEditing({});
  };
  const startEditing = (product) => {
    setEditing({
      [product._id]: {
        price: product.price,
        priceAfterDiscount: product.priceAfterDiscount,
        stock: product.stock,
        arDescription: product.product.arDescription,
      },
    });
  };

  const handleProductChange = (id, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdate = (productId, editing, setEditing) => {
    updateProduct(productId, editing, setEditing);
  };

  if (isLoading || loadingDuringDelete || isUpdating) return <Loader />;
  if (isError || errorDuringDelete || isErrorUpdating)
    return <ErrorMsg message={isError || "حدث خطا"} />;

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        contentLabel="Delete Confirmation"
        style={{
          content: {
            width: "30rem",
            height: "7rem",
            margin: "auto",
          },
        }}
      >
        <h5 className="card-title mb-2">هل انت متاكد من حذف المنتج ؟</h5>
        <button
          className="btn bg-danger text-white mx-2"
          onClick={handleConfirm}
        >
          تاكيد
        </button>
        <button className="btn bg-dark text-white" onClick={handleCancel}>
          اغلاق
        </button>
      </Modal>
      <div className="container bg-white me-0 p-1">
        <div className="text-right me-0">
          <h5>المنتجات الحاليه لدي</h5>
        </div>
        <div style={{ height: "500px", overflowY: "auto" }}>
          <table className="table table-striped responsive">
            <thead>
              <tr className="small">
                <th scope="col">حذف</th>
                <th scope="col">تعديل</th>
                <th scope="col">تفاصيل المنتج</th>
                <th scope="col">كميه المنتج</th>
                <th scope="col">السعر بعد الخصم</th>
                <th scope="col">سعر المنتج</th>
                <th scope="col">اسم المنتج</th>
              </tr>
            </thead>
            <tbody>
              {getMyProducts?.length > 0 ? (
                getMyProducts?.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="btn bg-danger text-white p-1 px-3 borderRadiousNone rounded"
                        onClick={() => handleDelete(product._id)}
                      >
                        حذف
                      </button>
                    </td>
                    <td>
                      {editing[product._id] ? (
                        <>
                          <button
                            className="btn bg-warning text-white mx-1 p-1 px-3 borderRadiousNone rounded"
                            onClick={cancelEdit}
                          >
                            إلغاء
                          </button>
                          <button
                            className="btn bg-success text-white p-1 px-3 borderRadiousNone rounded"
                            onClick={() =>
                              handleUpdate(product._id, editing, setEditing)
                            }
                          >
                            تحديث
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn bg-dark text-white p-1 px-3 borderRadiousNone rounded"
                          onClick={() => startEditing(product)}
                        >
                          تعديل
                        </button>
                      )}
                    </td>
                    {product.product.systemProduct === false ? (
                      <td>
                        {editing[product._id] ? (
                          <input
                            defaultValue={editing[product._id]?.arDescription}
                            onChange={(e) =>
                              handleProductChange(
                                product._id,
                                "arDescription",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          product.product.arDescription
                        )}
                      </td>
                    ) : (
                      <td>{product.product.arDescription}</td>
                    )}
                    <td>
                      {editing[product._id] ? (
                        <input
                          defaultValue={editing[product._id]?.stock}
                          onChange={(e) =>
                            handleProductChange(
                              product._id,
                              "stock",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        product.stock
                      )}
                    </td>
                    <td>
                      {editing[product._id] ? (
                        <input
                          defaultValue={
                            editing[product._id]?.priceAfterDiscount
                          }
                          onChange={(e) =>
                            handleProductChange(
                              product._id,
                              "priceAfterDiscount",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        product.priceAfterDiscount
                      )}
                    </td>
                    <td>
                      {editing[product._id] ? (
                        <input
                          defaultValue={editing[product._id]?.price}
                          onChange={(e) =>
                            handleProductChange(
                              product._id,
                              "price",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        product.price
                      )}
                    </td>
                    <td>{product.product.arName}</td>
                    <th scope="row">{index + 1}</th>
                  </tr>
                ))
              ) : (
                <p
                  className="text-center"
                  style={{ position: "absolute", right: "120px" }}
                >
                  لا يوجد حتي الان
                </p>
              )}
            </tbody>
          </table>
        </div>
        {isSuccessRequest && (
          <div className="alert alert-success">تم الارسال بنجاح</div>
        )}
      </div>
    </>
  );
}
