/* eslint-disable react/prop-types */
import Button from "../utils/Button";
import { useContext, useEffect, useState } from "react";
import { CounterContext } from "../context/store";
import { NavLink } from "react-router-dom";
import { updateUserInfoSchema } from "../schemas/Schemes";
import useCheckUserType from "../hooks/useCheckUserType";

export default function UserProfile() {
  const { userTypeLogin, loginUser } = useContext(CounterContext);
  const [userProfile, setUserProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchProducts() {
        try {
          setIsLoading(true);
          setIsError("");
          const response = await fetch(
            `${import.meta.env.VITE_APP_BASE_API_URL}Users/GetProfile?id=${
              loginUser?.id
            }`,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            }
          );
          if (!response.ok) throw new Error("حدث خطأ ما");
          const data = await response.json();
          if (data.hasError === true) throw new Error("حدث خطأ ما");

          setUserProfile(data.data);
          setIsError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setIsError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchProducts();
      return function () {
        controller.abort();
      };
    },
    [loginUser?.id, token]
  );

  const [user, setUser] = useState({
    arName: "",
    arDescription: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userProfile) {
      setUser((prevState) => ({
        ...prevState,
        arName: userProfile.arName || "",
        arDescription: userProfile.arDescription || "",
        email: userProfile.email || "",
        password: userProfile.password || "",
      }));
    }
  }, [userProfile]);

  const [isSuccessRequest, setIsSuccessRequest] = useState(false);

  async function updateUserInformations(e) {
    e.preventDefault();
    setIsLoading(true);

    const updatedUser = {
      arName: user.arName,
      arDescription: user.arDescription,
      email: user.email,
      password: user.password,
    };

    const validation = validationRegisterForm();

    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_API_URL}Users/UpdateProfile?id=${
            loginUser?.id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
          }
        );
        if (!response.ok) throw new Error("حدث خطأ ما");

        const data = await response.json();

        if (data.hasError === true) throw new Error("حدث خطأ ما");

        setIsLoading(false);
        setIsSuccessRequest(true);
      } catch (err) {
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  function validationRegisterForm() {
    let scheme = updateUserInfoSchema;
    return scheme.validate(user, { abortEarly: false });
  }

  function handleUserChange(e) {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  // check user type
  const { loading, getUserTypeById } = useCheckUserType();
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const userTypeData = getUserTypeById(userTypeLogin);
    setUserType(userTypeData);
  }, [userTypeLogin, getUserTypeById]);

  return (
    <div className="container my-4 bg-white rounded p-4">
      <div className="text-right mb-3 d-flex justify-content-between">
        <NavLink to="/dashboard" className="card-title h6">
          {loading
            ? "..."
            : userType && userType.arName === "عميل"
            ? "مشترياتي"
            : "وحده التحكم"}
        </NavLink>
        <>
          {loading ? (
            <div className="spinner-grow bg-orange" role="status">
              <span className="visually-hidden">...</span>
            </div>
          ) : (
            userType && (
              <h5 className="card-title h6">
                <span>نوع حسابك:</span>
                <span className="mx-3">{userType?.arName}</span>
              </h5>
            )
          )}
        </>
        <h5 className="card-title h6">
          <span className="mx-3">{userProfile.arName}</span>
          <span>اهلا بيك</span>
        </h5>
      </div>
      <div className="row row-cols-1 row-cols-md-1 g-4 pb-2">
        <div className="col">
          <div className="card bg-transparent border-0">
            <div className="card-body rounded">
              <form
                className="text-right mt-0 row g-3 d-flex justify-content-between"
                onSubmit={updateUserInformations}
              >
                <div className="col-md-6">
                  <label className="form-label text-dark">
                    البريد الالكتروني
                  </label>
                  <input
                    type="email"
                    className="form-control border"
                    name="email"
                    value={user.email}
                    onChange={handleUserChange}
                    placeholder="البريد الالكتروني"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-dark">الاسم</label>
                  <input
                    type="text"
                    className="form-control border"
                    name="arName"
                    value={user.arName}
                    onChange={handleUserChange}
                    placeholder="الاسم"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-dark">الوصف الخاص بك</label>
                  <input
                    type="text"
                    className="form-control border"
                    name="arDescription"
                    value={user.arDescription}
                    onChange={handleUserChange}
                    placeholder="الوصف الخاص بك"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-dark">كلمه المرور</label>
                  <input
                    type="password"
                    className="form-control border"
                    name="password"
                    value={user.password}
                    onChange={handleUserChange}
                    placeholder="كلمه المرور"
                  />
                </div>

                <div className="col-12 mt-4">
                  <Button type="primaryBtn">
                    {isLoading ? "جاري" : "تعديل البيانات"}
                  </Button>
                  <NavLink to="/products">
                    <Button type="primaryBtn">الغاء</Button>
                  </NavLink>
                </div>
                {isError && <div className="alert alert-danger">{isError}</div>}
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
}
