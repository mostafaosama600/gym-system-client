import Button from "../utils/Button";
import styles from "../scss/Login.module.scss";

export default function RequestReductionPrice() {
  return (
    <div className="container my-4 bg-white p-4">
      <div className="text-right mb-3">
        <h3 className="card-title">طلب تخفيض سعر منتج من الاداره</h3>
      </div>
      <div className="row row-cols-1 row-cols-md-1 g-4 pb-2 d-flex justify-right">
        <div className="col">
          <div className="card bg-transparent border-0">
            <div className="card-body">
              <form className="row row-cols-1 row-cols-md-2 g-4 pb-2">
                <div className="mb-5" id={`${styles.item3}`}>
                  <label className="form-label mb-3 text-dark">
                    البريد الالكتروني
                  </label>
                  <input
                    type="text"
                    className="form-control border"
                    placeholder="البريد الالكتروني"
                  />
                </div>
                <div className="mb-5" id={`${styles.item1}`}>
                  <label className="form-label mb-3 text-dark">
                    اسم المنتج
                  </label>
                  <input
                    type="text"
                    className="form-control border"
                    placeholder="اسم المنتج"
                  />
                </div>
                <div className="mb-5" id={`${styles.item4}`}>
                  <label className="form-label mb-3 text-dark">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    className="form-control border"
                    placeholder="رقم الهاتف"
                  />
                </div>
                <div className="mb-5" id={`${styles.item2}`}>
                  <label className="form-label mb-3 text-dark">
                    سعر المنتج المرغوب
                  </label>
                  <input
                    type="text"
                    className="form-control border"
                    placeholder="سعر المنتج المرغوب"
                  />
                </div>
              </form>
              <Button type="primaryBtn">ارسال الطلب</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
