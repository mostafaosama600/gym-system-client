import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="container">
      <div
        className="card text-center d-flex justify-content-center
        align-items-center bg-transparent border"
        style={{ height: "80vh" }}
      >
        <h5 className="card-title">
          هذه الصفحه غير متوفر في الموقع من فضلك كم بالعوده الي الصفحه الرئيسيه
          من هنا
          <NavLink className="mx-2" style={{ textDecoration: "none" }} to={-1}>
            للعوده
          </NavLink>
        </h5>
      </div>
    </div>
  );
}
