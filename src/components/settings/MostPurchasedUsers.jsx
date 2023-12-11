import { useContext, useState } from "react";
import { CounterContext } from "../../context/store";
import useAnalysis from "../../hooks/useAnalysis/useAnalysis";
import Loader from "../../utils/Loader";
import ErrorMsg from "../../utils/ErrorMsg";
import Button from "../../utils/Button";

export default function MostPurchasedUsers() {
  const { userID } = useContext(CounterContext);
  const [fromTo, setFromTo] = useState({ startDate: "", endDate: "" });

  function getUser(e) {
    e.persist();
    setFromTo({ ...fromTo, [e.target.name]: e.target.value });
  }
  const apiUrl = `${
    import.meta.env.VITE_APP_BASE_API_URL
  }AnalysisReports/MostPurchasedClients?id=${userID}`;

  const { isLoading, isError, dataAnalysis, handleSubmit } = useAnalysis(
    fromTo,
    apiUrl
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMsg message={isError} />;

  return (
    <div className="container bg-white me-0 p-1 rtl-products">
      <div className="text-right me-0 mb-3">
        <h5>العملاء الاكثر شراء</h5>
      </div>

      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label className="form-label text-dark">من تاريخ</label>
            <input
              type="date"
              className="form-control border"
              name="startDate"
              value={fromTo.startDate}
              onChange={getUser}
              placeholder="2023-11-10"
            />
          </div>
          <div className="col">
            <label className="form-label text-dark">الي تاريخ</label>
            <input
              type="date"
              className="form-control border"
              name="endDate"
              value={fromTo.endDate}
              onChange={getUser}
              placeholder="2023-11-19"
            />
          </div>
          <div className="col mt-4">
            <Button className="btn text-white bg-orange mt-2 py-2 px-4">
              {isLoading ? "جاري" : "استلام التقرير"}
            </Button>
          </div>
        </div>
        {isError && <div className="alert alert-danger">{isError}</div>}
      </form>
      <div style={{ height: "500px", overflowY: "auto" }}>
        <table className="table table-striped">
          <thead>
            <tr className="small">
              <th scope="col">#0</th>
              <th scope="col">اسم المشتري</th>
              <th scope="col">عدد مرات الشراء</th>
              <th scope="col">اجمالي تعاملاتي معه</th>
              <th scope="col">الشخضيه</th>
            </tr>
          </thead>
          <tbody>
            {dataAnalysis.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.user.arName}</td>
                <td>{item.repeats}</td>
                <td>{item.totalPaid}</td>
                <td>
                  <img
                    src={item.user.imageURL}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    alt={item.user.arName}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
