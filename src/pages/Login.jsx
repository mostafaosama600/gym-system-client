import { useContext, useState } from "react";
import styles from "../scss/Login.module.scss";
import Button from "../utils/Button";
import LeftSide from "../utils/LeftSide";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/Schemes";
import jwtDecode from "jwt-decode";
import { CounterContext } from "../context/store";

export default function Login() {
  const { getUserInfo } = useContext(CounterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({ phone: "", password: "" });

  function getUser(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  console.log(user);
  async function formSubmitLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    const validation = validationRegisterForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_API_URL}users/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          let userTypeLogin = responseData.data.user.type._id;
          const { token } = responseData.data;

          if (!token) {
            setErrorList("حدث خطا");
            setIsLoading(false);
            return;
          }
          let decodedToken;
          try {
            decodedToken = jwtDecode(token);
          } catch (error) {
            setIsError("حدث خطا");
            setIsLoading(false);
            return;
          }
          if (!decodedToken) {
            setIsError("حدث خطا");
            setIsLoading(false);
            return;
          }
          localStorage.setItem("userToken", token);
          localStorage.setItem("userTypeLogin", userTypeLogin);
          getUserInfo();
          setIsLoading(false);
          navigate("/user-profile");
        } else {
          const errDuringData = await response.json();
          setIsError(errDuringData.msg);
          setIsLoading(false);
        }
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }
  function validationRegisterForm() {
    let scheme = loginSchema;
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-md-2 g-0">
        <LeftSide styles={styles} />
        <div
          className={`col border-0 ${styles.rightside}`}
          id={`${styles.item1}`}
        >
          <div className={`card border-0 ${styles.boxofinputslogin}`}>
            <div className="card-body my-0">
              <div className="text-center">
                <h5 className="card-title text-dark mb-3">
                  تسجيل الدخول الى السيستم!
                </h5>
              </div>

              <form className="text-right mt-5" onSubmit={formSubmitLogin}>
                <div className="col-md-12">
                  <label className="form-label text-dark">
                    البريد الالكتروني
                  </label>
                  <input
                    type="email"
                    className="form-control border"
                    name="email"
                    value={user.email}
                    placeholder="البريد الالكتروني"
                    onChange={getUser}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label mb-3 text-dark">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    className="form-control border"
                    name="password"
                    value={user.password}
                    placeholder="كلمة المرور"
                    onChange={getUser}
                  />
                </div>

                <div className="col-12 mt-4">
                  <Button className="btn text-white bg-orange">
                    {isLoading ? "جاري" : "تسجيل الدخول"}
                  </Button>
                </div>
                {isError && (
                  <div className="alert alert-danger">
                    {isError ===
                    "Cannot read properties of null (reading 'user')"
                      ? "يوجد خطا في كلمه المرور او البريد الالكتروني - حاول مجددا"
                      : isError}
                  </div>
                )}
                {errorList.map((error, index) => (
                  <div key={index} className="alert alert-danger ">
                    {error.message}
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
