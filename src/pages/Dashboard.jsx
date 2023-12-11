import { useContext, useEffect, useState } from "react";
import Button from "../utils/Button";
import GetUserProducts from "../components/dashboard/GetUserProducts";
import AddUserProducts from "../components/dashboard/AddUserProducts";
import GetSoldPending from "../components/dashboard/GetSoldPending";
import GetSoldConfirmed from "../components/dashboard/GetSoldConfirmed";
import GetBoughtConfirmed from "../components/dashboard/GetBoughtConfirmed";
import GetBoughtPending from "../components/dashboard/GetBoughtPending";
import { CounterContext } from "../context/store";
import Loader from "../utils/Loader";

export default function Dashboard() {
  const { loading, userType } = useContext(CounterContext);

  const [activeTabDashboard, setActiveTabDashboard] = useState(
    userType && userType.arName === "عميل"
      ? "المشتريات المعلقه"
      : "اضافه منتج جديد"
  );

  useEffect(() => {
    if (userType && userType.arName === "عميل") {
      setActiveTabDashboard("المشتريات المعلقه");
    } else {
      setActiveTabDashboard("اضافه منتج جديد");
    }
  }, [userType]);

  function handleTabChange(selectedTab) {
    setActiveTabDashboard(selectedTab);
  }

  if (loading || !userType) {
    return <Loader />;
  }

  return (
    <>
      <div className="container bg-white my-5 p-0 h-100">
        <div className="py-2">
          {loading ? (
            <p>من فضلك انتظر</p>
          ) : userType && userType.arName === "عميل" ? (
            <>
              <Button
                className={`btn text-dark mx-1 ${
                  activeTabDashboard === "المشتريات المؤكده" ? "active" : ""
                }`}
                onClick={() => handleTabChange("المشتريات المؤكده")}
              >
                المشتريات المؤكده
              </Button>
              <Button
                className={`btn text-dark mx-1 ${
                  activeTabDashboard === "المشتريات المعلقه" ? "active" : ""
                }`}
                onClick={() => handleTabChange("المشتريات المعلقه")}
              >
                المشتريات المعلقه
              </Button>
            </>
          ) : (
            <>
              <Button
                className={`btn text-dark mx-1 ${
                  activeTabDashboard === "المشتريات المؤكده" ? "active" : ""
                }`}
                onClick={() => handleTabChange("المشتريات المؤكده")}
              >
                المشتريات المؤكده
              </Button>
              <Button
                className={`btn text-dark mx-1 ${
                  activeTabDashboard === "المشتريات المعلقه" ? "active" : ""
                }`}
                onClick={() => handleTabChange("المشتريات المعلقه")}
              >
                المشتريات المعلقه
              </Button>
              <Button
                className={`btn text-dark mx-1 ${
                  activeTabDashboard === "الفواتير المكتمله" ? "active" : ""
                }`}
                onClick={() => handleTabChange("الفواتير المكتمله")}
              >
                الفواتير المكتمله
              </Button>
              <Button
                className={`btn text-dark mx-1 ${
                  activeTabDashboard === "المبيعات المعلقه" ? "active" : ""
                }`}
                onClick={() => handleTabChange("المبيعات المعلقه")}
              >
                المبيعات المعلقه
              </Button>
              <Button
                className={`btn text-dark mx-1 ${
                  activeTabDashboard === "المنتجات الحاليه لدي" ? "active" : ""
                }`}
                onClick={() => handleTabChange("المنتجات الحاليه لدي")}
              >
                المنتجات الحاليه لدي
              </Button>
              <Button
                className={`btn text-dark mx-1 ${
                  activeTabDashboard === "اضافه منتج جديد" ? "active" : ""
                }`}
                onClick={() => handleTabChange("اضافه منتج جديد")}
              >
                اضافه منتج جديد
              </Button>
            </>
          )}
        </div>
        {activeTabDashboard === "اضافه منتج جديد" && <AddUserProducts />}
        {activeTabDashboard === "المنتجات الحاليه لدي" && <GetUserProducts />}
        {activeTabDashboard === "المبيعات المعلقه" && <GetSoldPending />}
        {activeTabDashboard === "الفواتير المكتمله" && <GetSoldConfirmed />}
        {activeTabDashboard === "المشتريات المعلقه" && <GetBoughtPending />}
        {activeTabDashboard === "المشتريات المؤكده" && <GetBoughtConfirmed />}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
