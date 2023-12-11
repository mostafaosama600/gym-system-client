import { useContext } from "react";
import { CounterContext } from "../../context/store";
import useGetFatora from "../../hooks/useInvoices/useGetFatora";
import Loader from "../../utils/Loader";
import ErrorMsg from "../../utils/ErrorMsg";

export default function GetBoughtPending() {
  const { userID } = useContext(CounterContext);
  const {
    isLoading,
    isError,
    data: pending,
  } = useGetFatora(
    `${
      import.meta.env.VITE_APP_BASE_API_URL
    }Invoices/BoughtPendingInvoices?id=${userID}`
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMsg message={isError} />;

  return (
    <div className="container bg-white me-0 p-1 rtl-products">
      <div className="text-right me-0">
        <h5>المشتريات المعلقه</h5>
      </div>
      <div style={{ height: "500px", overflowY: "auto" }}>
        <table className="table table-striped">
          <thead>
            <tr className="small">
              <th scope="col">#0</th>
              <th scope="col">اسم وتفاصيل المنتج</th>
              <th scope="col">اسم المشتري (اسمك)</th>
              <th scope="col">كميه المنتج المطلوبه</th>
              <th scope="col">سعر منتجك</th>
              <th scope="col">الاجمالي</th>
              <th scope="col">معلقه</th>
              <th scope="col">مدفوعه</th>
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
                  <th>{item.seller && item.seller.arName}</th>
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
                </tr>
              ))
            ) : (
              <p>لا يوجد حتي الان</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
