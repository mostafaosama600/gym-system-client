import { useState } from "react";
import Button from "../../utils/Button";
import { registerSellerSchema } from "../../schemas/Schemes";
import { useRegister } from "../../hooks/useRegistration/useRegister";
import { governorates } from "../../data/governorates.json";
import UploadImageRegister from "./UploadImageRegister";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Supplier() {
  const [user, setUser] = useState({
    arName: "",
    arDescription: "",
    commercialRegistrationNo: "",
    email: "",
    phone: "",
    governorate: "",
    state: "",
    region: "",
    password: "",
    imageURL: null || "",
  });

  function getUser(e) {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handlePhoneChange = (formattedValue) => {
    setUser({ ...user, phone: "+" + formattedValue });
  };

  const apiUrl = `${
    import.meta.env.VITE_APP_BASE_API_URL
  }Authentication/FarmRegister`;

  const { handleSubmit, isLoading, isError, errorList, userExistError } =
    useRegister(user, registerSellerSchema, apiUrl);

  // Function to filter states based on selected region
  const getStatesForRegion = () => {
    const selectedGovernorate = governorates.find(
      (governorate) => governorate.arName === user.governorate
    );

    if (selectedGovernorate) {
      return selectedGovernorate.states.map((state) => (
        <option key={state._id} value={state.arName}>
          {state.arName}
        </option>
      ));
    }

    return null;
  };

  const handleImageUpload = (imageURL) => {
    setUser({ ...user, imageURL: imageURL });
  };

  return (
    <div className="container border-top">
      <form className="row g-3 mt-2" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label text-dark">البريد الالكتروني</label>
          <input
            type="email"
            className="form-control border"
            name="email"
            value={user.email}
            placeholder="البريد الالكتروني"
            onChange={getUser}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-dark">الاسم</label>
          <input
            type="text"
            className="form-control border"
            name="arName"
            value={user.arName}
            placeholder="الاسم"
            onChange={getUser}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label text-dark">الوصف</label>
          <input
            type="text"
            className="form-control border"
            name="arDescription"
            value={user.arDescription}
            placeholder="الوصف"
            onChange={getUser}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-dark">رقم الهاتف</label>
          <PhoneInput
            country={"om"}
            name="phone"
            inputStyle={{ padding: "22px" }}
            value={user?.phone}
            onChange={handlePhoneChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label text-dark">العنوان</label>
          <input
            type="text"
            className="form-control border"
            name="address"
            value={user.address}
            placeholder="العنوان"
            onChange={getUser}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label text-dark">المنطقه</label>
          <input
            type="text"
            className="form-control border"
            name="region"
            value={user.region}
            placeholder="المنطقه"
            onChange={getUser}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label text-dark">الولاية</label>
          <select
            className="form-control border"
            name="state"
            value={user.state}
            onChange={getUser}
          >
            <option value="">اختر الولاية</option>
            {getStatesForRegion()}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label text-dark">المحافظه</label>
          <select
            className="form-control border"
            name="governorate"
            value={user.governorate}
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

        <div className="col-md-6">
          <label className="form-label text-dark">اضافه صوره</label>
          <UploadImageRegister onImageUpload={handleImageUpload} />
        </div>

        <div className="col-md-6">
          <label className="form-label text-dark">رقم السجل التجاري</label>
          <input
            type="text"
            className="form-control border"
            name="commercialRegistrationNo"
            value={user.commercialRegistrationNo}
            placeholder="رقم السجل التجاري"
            onChange={getUser}
          />
        </div>
        <div className="col-md-12">
          <label className="form-label text-dark">كلمه المرور</label>
          <input
            type="password"
            className="form-control border"
            name="password"
            value={user.password}
            placeholder="كلمه المرور"
            onChange={getUser}
          />
        </div>

        <div className="col-12 mt-4">
          <Button className="btn text-white bg-orange">
            {isLoading ? "جاري" : "انشاء حساب"}
          </Button>
        </div>
        {isError && <div className="alert alert-danger">{isError}</div>}
        {errorList.map((error, index) => (
          <div key={index} className="alert alert-danger ">
            {error.message}
          </div>
        ))}
        {userExistError && (
          <div className="alert alert-danger">{userExistError}</div>
        )}
      </form>
    </div>
  );
}
