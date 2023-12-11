import styles from "../scss/Contact.module.scss";
import Button from "../utils/Button";
import svgemails from "/emails.svg";
import { useState } from "react";
import { contactUsSchema } from "../schemas/Schemes";

export default function Contactus() {
  const [userContact, setUserContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [isSuccessRequest, setIsSuccessRequest] = useState(false);
  const token = localStorage.getItem("userToken");

  function getUser(e) {
    e.persist();
    setUserContact({ ...userContact, [e.target.name]: e.target.value });
  }

  async function submitContactUsForm(e) {
    e.preventDefault();
    setIsLoading(true);

    const validation = validationRegisterForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_API_URL}Contact/ContactUs`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userContact),
          }
        );

        if (!response.ok) throw new Error("حدث خطأ ما");
        const data = await response.json();
        if (data.hasError === true) throw new Error("حدث خطأ ما");
        if (response.ok) {
          setIsLoading(false);
          setIsSuccessRequest(true);
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
    let scheme = contactUsSchema;
    return scheme.validate(userContact, { abortEarly: false });
  }

  return (
    <div className="container">
      <div className={`text-center my-4`}>
        <img src={svgemails} alt="emails" />
        <h3 className={`card-title ${styles.boxofcontent}`}>
          تواصل معنا!
          <span className={styles.dots}></span>
        </h3>
        <p className="card-text mt-3">
          لا تتردد اذا عندك اي استفسار اوي شكوي ارسل لنا
        </p>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col" id={`${styles.item2}`}>
          <div className="card mt-3 bg-transparent border-0">
            <form className="text-right" onSubmit={submitContactUsForm}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control border"
                  placeholder="الاسم"
                  name="name"
                  value={userContact.name}
                  onChange={getUser}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control border"
                  placeholder="البريد الالكتروني"
                  name="email"
                  value={userContact.email}
                  onChange={getUser}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control border"
                  placeholder="رسالتك / شكوتك"
                  rows="3"
                  name="message"
                  value={userContact.message}
                  onChange={getUser}
                ></textarea>
              </div>
              <Button type="sendBtn">{isLoading ? "جاري" : "ارسل الان"}</Button>
            </form>
            {isSuccessRequest && (
              <div className="alert alert-success">تم الارسال بنجاح</div>
            )}
            {isError && <div className="alert alert-danger">{isError}</div>}
            {errorList.map((error, index) => (
              <div key={index} className="alert alert-danger ">
                {error.message}
              </div>
            ))}
          </div>
        </div>
        <div className="col" id={`${styles.item1}`}>
          <div className="card bg-transparent border-0">
            <div className={`me-4 ${styles.boxofcontact}`}>
              <div className={`card-body ${styles.cardbody} mx-5`}>
                <div className="d-flex bg-white p-3">
                  <div className="w-100">
                    <h5 className="card-title">الموقع</h5>
                    <span className="card-title gray-text">
                      الدمام - المملكة العربية السعودية
                    </span>
                  </div>
                  <span className="circle-mail-us mx-3"></span>
                </div>
                <div className="d-flex bg-white p-3 py-3">
                  <div className="w-100">
                    <h5 className="card-title">اتصل بنا</h5>
                    <span className="card-title gray-text">+000 555555555</span>
                  </div>
                  <span className="circle-mail-us mx-3"></span>
                </div>
                <div className="d-flex bg-white p-3">
                  <div className="w-100">
                    <h5 className="card-title">البريد الإلكتروني</h5>
                    <span className="card-title gray-text">support@X.com</span>
                  </div>
                  <span className="circle-mail-us mx-3"></span>
                  {/* <img src={svgmailus} alt="mail us" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
