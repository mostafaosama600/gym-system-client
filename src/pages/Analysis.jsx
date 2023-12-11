import { useState } from "react";
import Button from "../utils/Button";
import MostPurchasedUsers from "../components/settings/MostPurchasedUsers";
import MostBoughtWithDate from "../components/settings/MostBoughtWithDate";
import MostBoughtProduct from "../components/settings/MostBoughtProduct";
import MostSoldProduct from "../components/settings/MostSoldProduct";

export default function Analysis() {
  const [activeTabSetting, setActiveTabSetting] = useState(
    "العملاء الاكثر شراء"
  );
  function onTabChange(selectedTab) {
    setActiveTabSetting(selectedTab);
  }
  return (
    <div className="container bg-white my-5 p-0 h-100">
      <div className="py-2">
        <Button
          className={`btn text-dark mx-1 ${
            activeTabSetting === "المنتج الاكثر شراء" ? "active" : ""
          }`}
          onClick={() => onTabChange("المنتج الاكثر شراء")}
        >
          المنتج الاكثر شراء
        </Button>
        <Button
          className={`btn text-dark mx-1 ${
            activeTabSetting === "الأكثر شراء من" ? "active" : ""
          }`}
          onClick={() => onTabChange("الأكثر شراء من")}
        >
          الأكثر شراء من
        </Button>
        <Button
          className={`btn text-dark mx-1 ${
            activeTabSetting === "المنتج الاكثر مبيعا" ? "active" : ""
          }`}
          onClick={() => onTabChange("المنتج الاكثر مبيعا")}
        >
          المنتج الاكثر مبيعا
        </Button>
        <Button
          className={`btn text-dark mx-1 ${
            activeTabSetting === "العملاء الاكثر شراء" ? "active" : ""
          }`}
          onClick={() => onTabChange("العملاء الاكثر شراء")}
        >
          العملاء الاكثر شراء
        </Button>
      </div>
      {activeTabSetting === "العملاء الاكثر شراء" && <MostPurchasedUsers />}
      {activeTabSetting === "الأكثر شراء من" && <MostBoughtWithDate />}
      {activeTabSetting === "المنتج الاكثر شراء" && <MostBoughtProduct />}
      {activeTabSetting === "المنتج الاكثر مبيعا" && <MostSoldProduct />}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
