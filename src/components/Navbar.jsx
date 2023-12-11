import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CounterContext } from "../context/store";
import Button from "../utils/Button";
import logoDagagino from "/Logo-1.png";

export default function Navbar() {
  const { loading, userType, loginUser, logOut } = useContext(CounterContext);

  return (
    <nav className={`navbar navbar-expand-lg`}>
      <div className="container-fluid">
        <div className="d-flex">
          {loginUser === null ? (
            <>
              <NavLink to="/signup">
                <Button type="primaryBtn">انشاء حساب</Button>
              </NavLink>
              <NavLink to="/login">
                <Button type="mainBtn"> تسجيل الدخول</Button>
              </NavLink>
            </>
          ) : (
            <>
              <Button type="primaryBtn" onClick={logOut}>
                تسجيل خروج
              </Button>
              <NavLink to="/user-profile">
                <Button type="primaryBtn">الشخصيه</Button>
              </NavLink>
            </>
          )}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {loginUser ? (
              <>
                <li className="nav-item">
                  {userType && userType.arName !== "عميل" && (
                    <NavLink to="/settings" className={`nav-link`}>
                      التقارير اليوميه
                    </NavLink>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink to="/dashboard" className={`nav-link`}>
                    {loading
                      ? "..."
                      : userType && userType.arName === "عميل"
                      ? "مشترياتي"
                      : "وحده التحكم"}
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink to="/farm-products" className={`nav-link`}>
                    منتجات المزارع
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/supplier-products" className={`nav-link`}>
                    منتجات الموردين
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink to="/products" className={`nav-link`}>
                    جميع المنتحات
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link">تواصل معنا / الشكاوي</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">التطبيق</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">من نحن؟</a>
                </li>
                <li className="nav-item">
                  <NavLink to="/" className={`nav-link`}>
                    الرئيسية
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <NavLink to="/">
            <img
              src={logoDagagino}
              className={`navbar-brand`}
              style={{ width: "70px" }}
              alt=""
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
