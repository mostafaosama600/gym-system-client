import { useState } from "react";
import styles from "../scss/Login.module.scss";
import LeftSide from "../utils/LeftSide";
import svgsmile from "/smile.svg";
import Supplier from "../components/users/SupplierUser";
import DefaultUser from "../components/users/DefaultUser";
import Seller from "../components/users/SellerUser";
import Button from "../utils/Button";

export default function CreateAccount() {
  const [activeTab, setActiveTab] = useState("مورد");
  function handleTabChange(selectedTab) {
    setActiveTab(selectedTab);
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
                  انشاء حساب جاري علي الموقع
                </h5>
                <img src={svgsmile} alt="smile" />
              </div>
              <div className="container border-top  mt-5 p-0">
                <div className="py-2">
                  <Button
                    className={`btn text-dark mx-2 ${
                      activeTab === "بائع" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("بائع")}
                  >
                    بائع
                  </Button>

                  <Button
                    className={`btn text-dark mx-2 ${
                      activeTab === "مستخدم عادي" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("مستخدم عادي")}
                  >
                    مستخدم عادي
                  </Button>
                  <Button
                    className={`btn text-dark mx-2 ${
                      activeTab === "مورد" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("مورد")}
                  >
                    مورد
                  </Button>
                </div>

                {activeTab === "مورد" && <Supplier />}
                {activeTab === "مستخدم عادي" && <DefaultUser />}
                {activeTab === "بائع" && <Seller />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
