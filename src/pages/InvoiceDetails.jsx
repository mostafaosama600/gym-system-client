import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ErrorMsg from "../utils/ErrorMsg";
import Loader from "../utils/Loader";

export default function InvoiceDetails() {
  const { id } = useParams();
  const { isLoading, isError, products } = useFetch(
    `Invoices/GetInvoiceById?id=${id}`
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMsg message={isError} />;

  return (
    <>
      {products && products.products && products.products.length > 0 && (
        <div className="container bg-white mt-5 p-1 rtl-products">
          <div className="text-right">
            <h5>الفاتوره</h5>
          </div>
          <table className="table table-striped">
            <thead>
              <tr className="small">
                <th scope="col">#</th>
                <th scope="col">اسم البائع</th>
                <th scope="col">المحافظه</th>
                <th scope="col">المنطقه</th>
                <th scope="col">اسم المشتري (اسمك)</th>
                <th scope="col">اسم المنتج</th>
                <th scope="col">سعر المنتج</th>
                <th scope="col">الكميه المطلوبه</th>
                <th scope="col">السعر النهائي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{products?.seller?.arName}</td>
                <td>{products?.seller?.governorate}</td>
                <td>{products?.seller?.region}</td>
                <td>{products?.buyer?.arName}</td>
                <td>{products?.products[0]?.product?.arName}</td>
                <td>{products?.products[0]?.price}</td>
                <td>{products?.products[0]?.qty}</td>
                <td>{products?.products[0]?.totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <button className="btn bg-orange text-white my-4">
            الذهاب لاجراء عمليه الدفع
          </button>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
