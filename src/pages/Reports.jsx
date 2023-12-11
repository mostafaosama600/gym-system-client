import { useContext, useState } from "react";
import { CounterContext } from "../context/store";
import Button from "../utils/Button";
import styles from "../scss/Login.module.scss";
import { reportUsSchema } from "../schemas/Schemes";

export default function Reports() {
  const { loginUser } = useContext(CounterContext);
  const [userReport, setUserReport] = useState({
    user: loginUser?.id,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [isSuccessRequest, setIsSuccessRequest] = useState(false);

  function getUser(e) {
    e.persist();
    setUserReport({ ...userReport, [e.target.name]: e.target.value });
  }

  const token = localStorage.getItem("userToken");

  async function submitReportUsForm(e) {
    e.preventDefault();
    setIsLoading(true);

    const validation = validationRegisterForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_API_URL}Contact/Report`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userReport),
          }
        );

        if (!response.ok) throw new Error("حدث خطأ ما");
        const data = await response.json();
        if (data.hasError === true) throw new Error("حدث خطأ ما");
        if (response.ok) {
          setIsSuccessRequest(true);
          setIsLoading(false);
        } else {
          setIsError(data.msg);
        }
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  function validationRegisterForm() {
    let scheme = reportUsSchema;
    return scheme.validate(userReport, { abortEarly: false });
  }

  if (loginUser) {
    return (
      <div className="container my-4 bg-white p-4">
        <div className="text-right mb-3">
          <h3 className="card-title">قم بارسال الشكوي</h3>
        </div>
        <div className="row row-cols-1 row-cols-md-1 g-4 pb-2 d-flex justify-right">
          <div className="col">
            <div className="card bg-transparent border-0">
              <div className="card-body">
                <form
                  className="row row-cols-1 row-cols-md-1 g-4 pb-2"
                  onSubmit={submitReportUsForm}
                >
                  <div className="mb-2" id={`${styles.item1}`}>
                    <label className="form-label mb-1 text-dark">الشكوي</label>
                    <textarea
                      id=""
                      cols="30"
                      rows="10"
                      type="text"
                      className="form-control border"
                      name="message"
                      value={userReport.message}
                      onChange={getUser}
                      placeholder="ما هي شكوتك ؟"
                    ></textarea>
                  </div>
                  <div className="w-100" id={`${styles.item2}`}>
                    <Button type="primaryBtn">
                      {isLoading ? "جاري" : "ارسل الشكوي"}
                    </Button>
                  </div>
                  {isError && (
                    <div className="alert alert-danger">{isError}</div>
                  )}
                  {errorList.map((error, index) => (
                    <div key={index} className="alert alert-danger ">
                      {error.message}
                    </div>
                  ))}
                  {isSuccessRequest && (
                    <div className="alert alert-success">تم الارسال بنجاح</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
