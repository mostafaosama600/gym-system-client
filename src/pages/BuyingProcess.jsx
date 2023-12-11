import { useContext, useState } from "react";
import { CounterContext } from "../context/store";
import { useNavigate, useParams } from "react-router-dom";
import { governorates } from "../data/governorates.json";

export default function BuyingProcess() {
  const { prodID, sellerID, price, discount, prodName, stock, sellerName } =
    useParams();
  const { userID } = useContext(CounterContext);

  const [productProcess, setProductProcess] = useState({
    seller: sellerID,
    clientType: "",
    totalValue: "",
    totalAfterDiscount: "",
    address: "",
    state: "",
    governorate: "",
    products: [
      {
        product: prodID,
        price: price,
        priceAfterDiscount: discount,
        qty: "",
        totalPrice: "",
      },
    ],
  });

  const [isLoadingCreateInvoice, setIsLoadingCreateInvoice] = useState(false);
  const [isErrorCreateInvoice, setIsErrorCreateInvoice] = useState("");
  const [userError, setUserError] = useState("");
  const [isLoadingPayInvoice, setIsLoadingPayInvoice] = useState(false);
  const [isErrorPayInvoice, setIsErrorPayInvoice] = useState("");

  // CREATE THE INVOICE
  const getUser = (e) => {
    const { value, name } = e.target;
    const updatedProductProcess = { ...productProcess };

    // Update the qty value based on the input name
    updatedProductProcess.products[0][name] = value;

    // Calculate the totalValue and totalPrice
    const qty = parseFloat(updatedProductProcess.products[0].qty);
    const price = updatedProductProcess.products[0].price;
    const priceAfterDiscount =
      updatedProductProcess.products[0].priceAfterDiscount;
    if (name === "address") updatedProductProcess.address = value;
    if (name === "governorate") updatedProductProcess.governorate = value;
    if (name === "state") updatedProductProcess.state = value;

    if (!isNaN(qty) && !isNaN(price) && !isNaN(priceAfterDiscount)) {
      updatedProductProcess.totalValue = (qty * price).toString();
      updatedProductProcess.totalAfterDiscount = (
        qty * priceAfterDiscount
      ).toString();
      updatedProductProcess.products[0].totalPrice = (
        qty * priceAfterDiscount
      ).toString();
    } else {
      updatedProductProcess.address = "";
      updatedProductProcess.state = "";
      updatedProductProcess.governorate = "";
      updatedProductProcess.totalValue = "";
      updatedProductProcess.totalAfterDiscount = "";
      updatedProductProcess.products[0].totalPrice = "";
    }
    setProductProcess(updatedProductProcess);
  };

  console.log(productProcess);
  const token = localStorage.getItem("userToken");

  const navigate = useNavigate();
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (productProcess.products[0].qty > stock)
      return setUserError(
        "هذه الكميه غير متوفره لدي البائع قم بتقليل الكميه لاجراء الطلب"
      );

    setIsLoadingCreateInvoice(true);
    console.log(productProcess);

    let url = `${
      import.meta.env.VITE_APP_BASE_API_URL
    }Invoices/CreateInvoice?id=${userID}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productProcess),
      });

      if (!response.ok) throw new Error("حدث خطأ ما");
      const data = await response.json();
      if (data && data.hasError) throw new Error(data.arError);
      if (response.ok) {
        setIsLoadingCreateInvoice(false);
        createPayInvoice(e, data.data?._id);
      } else {
        setIsErrorCreateInvoice(data.msg);
      }
    } catch (err) {
      console.error(err);
      setIsErrorCreateInvoice(err.message);
    } finally {
      setIsLoadingCreateInvoice(false);
    }
  }

  // PAY THE INVOICE
  async function createPayInvoice(e, getPayInvoiceID) {
    e.preventDefault();
    setIsLoadingPayInvoice(true);

    if (getPayInvoiceID == null) {
      setIsLoadingPayInvoice(false);
      setIsErrorPayInvoice(
        "يرجي تاكيد عمليه الشراء مرا اخري بسبب حدوث عطل فني"
      );
    }

    const payInvoice = {
      id: getPayInvoiceID,
      paymentOrderID: "Payment ID",
    };

    let url = `https://dagagino.onrender.com/Invoices/PayInvoice`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payInvoice),
      });

      if (!response.ok) {
        setIsErrorPayInvoice(
          "يرجي تاكيد عمليه الشراء مرا اخري بسبب حدوث عطل فني"
        );
      }
      const data = await response.json();
      if (data && data.hasError) {
        setIsErrorPayInvoice(
          "يرجي تاكيد عمليه الشراء مرا اخري بسبب حدوث عطل فني"
        );
      }

      if (response.ok) {
        setIsLoadingPayInvoice(false);
        navigate(`/invoice-details/${getPayInvoiceID}`, data.data);
      } else {
        setIsErrorPayInvoice(data.msg);
      }
    } catch (err) {
      setIsErrorPayInvoice(err.message);
    } finally {
      setIsLoadingPayInvoice(false);
    }
  }

  const getStatesForRegion = () => {
    const selectedGovernorate = governorates.find(
      (governorate) => governorate.arName === productProcess.governorate
    );

    if (selectedGovernorate) {
      const selectedState = selectedGovernorate.states.find(
        (state) => state.arName === productProcess.state
      );

      if (selectedState) {
        // Set state and governorate IDs in the productProcess state
        setProductProcess((prevProductProcess) => ({
          ...prevProductProcess,
          state: selectedState._id,
          governorate: selectedGovernorate?._id,
        }));
      }
      return selectedGovernorate.states.map((state) => (
        <option key={state._id} value={state._id}>
          {state.arName}
        </option>
      ));
    }

    return null;
  };

  return (
    <div className="container my-4 bg-white p-4" onSubmit={handleFormSubmit}>
      <div className="text-right mb-3 d-flex justify-content-between">
        <h5 className="card-title">سعر المنتج - {price}</h5>
        <h5 className="card-title">الكميه المتوفره- {stock}</h5>
        <h5 className="card-title">
          طلب منتج - {prodName} - {sellerName}
        </h5>
      </div>
      <form className="row g-3 rtl-products">
        <div className="col-md-6">
          <label className="form-label">حدد الكميه</label>
          <input
            type="text"
            className="form-control border"
            value={productProcess.products[0].qty}
            onChange={getUser}
            name="qty"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">العنوان</label>
          <input
            type="text"
            className="form-control border"
            value={productProcess.address}
            onChange={getUser}
            name="address"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label text-dark">المحافظه</label>
          <select
            className="form-control border new-inputs"
            name="governorate"
            value={productProcess.governorate}
            onChange={getUser}
          >
            <option value="">اختر المنطقة</option>
            {governorates.map((governorate) => (
              <option key={governorate._id} value={governorate.arName}>
                {governorate.arName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label text-dark">الولاية</label>
          <select
            className="form-control border new-inputs"
            name="state"
            value={productProcess.state}
            onChange={getUser}
          >
            <option value="">اختر الولاية</option>
            {getStatesForRegion()}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">السعر بعد الخصم</label>
          <input
            type="text"
            className="form-control border"
            value={productProcess.products[0].priceAfterDiscount}
            readOnly
            disabled
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">القيمة الإجمالية</label>
          <input
            type="text"
            className="form-control border"
            value={productProcess.totalValue}
            readOnly
            disabled
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">الإجمالي بعد الخصم</label>
          <input
            type="text"
            className="form-control border"
            value={productProcess.totalAfterDiscount}
            readOnly
            disabled
          />
        </div>
        <div className="col-md-6 text-white">
          {productProcess.products[0].totalPrice ? (
            <div
              className="border bg-dark auto d-flex justify-content-around rounded"
              style={{
                marginTop: "30px",
                paddingTop: "8px",
              }}
            >
              <p>سعر الدفع النهائي</p>
              <p>{productProcess.products[0].totalPrice}</p>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-12">
          <button type="submit" className="btn bg-orange text-white">
            {isLoadingCreateInvoice || isLoadingPayInvoice
              ? "جاري"
              : "اكد الطلب"}
          </button>
        </div>
        {isErrorCreateInvoice || isErrorPayInvoice || userError ? (
          <span className="alert alert-danger w-50">
            {isErrorCreateInvoice || isErrorPayInvoice || userError}
          </span>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
