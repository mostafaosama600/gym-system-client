import useGetFatora from "../../hooks/useInvoices/useGetFatora";
import Loader from "../../utils/Loader";
import ErrorMsg from "../../utils/ErrorMsg";
import { useContext, useState } from "react";
import { CounterContext } from "../../context/store";

export default function GetSoldPending() {
  const { userID } = useContext(CounterContext);
  const {
    isLoading,
    isError,
    data: pending,
  } = useGetFatora(
    `${
      import.meta.env.VITE_APP_BASE_API_URL
    }Invoices/SoldPendingInvoices?id=${userID}`
  );

  const [isSuccessRequest, setIsSuccessRequest] = useState(false);

  // PAY THE INVOICE

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  const token = localStorage.getItem("userToken");

  const createConfirmation = async (confirmID) => {
    setConfirmLoading(true);
    if (confirmID == null) {
      setConfirmLoading(false);
      setConfirmError("يرجي تاكيد عمليه التاكيد مرااخري بسبب حدوث عطل فني");
    }

    const confirmationBody = { id: confirmID };
    let url = `${import.meta.env.VITE_APP_BASE_API_URL}Invoices/ConfirmOrder`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(confirmationBody),
      });

      if (!response.ok) setConfirmError("يرجي التاكيد مرا اخري");
      const data = await response.json();
      if (data && data.hasError) setConfirmError("يرجي التاكيد مرا اخري");

      if (response.ok) {
        setConfirmLoading(false);
        setIsSuccessRequest(true);
      } else {
        setConfirmError(data.msg);
      }
    } catch (err) {
      setConfirmError(err.message);
    } finally {
      setConfirmLoading(false);
    }
  };

  if (isLoading || confirmLoading) return <Loader />;
  if (isError || confirmError) return <ErrorMsg message={isError} />;

  return (
    <div className="container bg-white me-0 p-1 rtl-products">
      <div className="text-right me-0">
        <h5>المبيعات المعلقه</h5>
      </div>
      <div style={{ height: "500px", overflowY: "auto" }}>
        <table className="table table-striped">
          <thead>
            <tr className="small">
              <th scope="col">#0</th>
              <th scope="col">اسم وتفاصيل المنتج</th>
              <th scope="col">اسم المشتري</th>
              <th scope="col">كميه المنتج المطلوبه</th>
              <th scope="col">سعر منتجك</th>
              <th scope="col">الاجمالي</th>
              <th scope="col">معلقه</th>
              <th scope="col">مدفوعه</th>
              <th scope="col">تاكيد العمليه</th>
            </tr>
          </thead>
          <tbody>
            {pending.length > 0 ? (
              pending.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>
                    {item.products &&
                      item.products.map(
                        (product) =>
                          `${product.product.arName} - ${product.product.arDescription}`
                      )}
                  </th>
                  <th>{item.buyer && item.buyer.arName}</th>
                  <th>
                    {item.products &&
                      item.products.map((product) => `${product.qty}`)}
                  </th>
                  <th>
                    {item.products &&
                      item.products.map(
                        (product) => `${product.priceAfterDiscount}`
                      )}
                  </th>

                  <th>{item.totalAfterDiscount}</th>

                  <th>{item.isPending ? "نعم" : "لا"}</th>
                  <th scope="row">{item.isPaid ? "نعم" : "لا"}</th>
                  <th scope="row">
                    <button
                      className="btn btn-success"
                      onClick={() => createConfirmation(item?._id)}
                    >
                      تاكيد
                    </button>
                  </th>
                </tr>
              ))
            ) : (
              <p>لا يوجد حتي الان</p>
            )}
          </tbody>
        </table>
      </div>
      {isSuccessRequest && (
        <div className="alert alert-success">تم الارسال بنجاح</div>
      )}
    </div>
  );
}
