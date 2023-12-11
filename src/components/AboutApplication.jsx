import styles from "../scss/AboutApplication.module.scss";
import svgthreecircles from "/threeofcircles.svg";
import svgmobilephone from "/mobilephone.svg";
import svgdefaultstar from "/defaultstar.svg";
import svgarrowofapp from "/arrowofapp.svg";

export default function AboutApplication() {
  return (
    <div className={`container-fluid ${styles.containerofmobile}`}>
      <img
        src={svgthreecircles}
        className={`${styles.circlesonresbonsive}`}
        alt="three of circles"
      />
      <div
        className={`row row-cols-1 row-cols-md-2 g-0 ${styles.svgmobilephone}`}
      >
        <div className={`col`}>
          <div className="card bg-transparent border-0">
            <div className="card-body">
              <h5 className="card-title text-white fw-bold mb-4">عن التطبيق</h5>
              <div className="d-flex mb-4 reset-element">
                <div className="me-2">
                  <h6 className="card-title text-white">أسعارنا منافسة</h6>
                  <p className="card-text text-white w-100">
                    عشان رضاك يهمنا .. جرب رايد وراح تفرق اسعارنا معك
                  </p>
                </div>
                <img src={svgdefaultstar} alt="default star" />
              </div>
              <div className="d-flex mb-4 reset-element">
                <div className="me-2">
                  <h6 className="card-title text-white">
                    تدفع بالطريقة الي تناسبك
                  </h6>
                  <p className="card-text text-white w-100">
                    طرق دفع في تطبيق X متعددة أختار الطريقة الي تناسبك
                  </p>
                </div>
                <img src={svgdefaultstar} alt="default star" />
              </div>
              <div className="d-flex mb-4 reset-element">
                <div className="me-2">
                  <h6 className="card-title text-white">
                    تدفع بالطريقة الي تناسبك
                  </h6>
                  <p className="card-text text-white w-100">
                    طرق دفع في تطبيق X متعددة أختار الطريقة الي تناسبك
                  </p>
                </div>
                <img
                  src={svgdefaultstar}
                  className={`${styles.svgdefaultstar}`}
                  alt="default star"
                />
              </div>
              <div className="d-flex mb-4 reset-element">
                <div className="me-2">
                  <h6 className="card-title text-white">كفاءة مزودي الخدمة</h6>
                  <p className="card-text text-white w-100">
                    عشان تحصل افضل خدمة حرصنا على كفاءة السائقين . وعلى تسجيل
                    وقبول سائقين مرخصين لتزويدك بالخدمة المطلوبه
                  </p>
                </div>
                <img src={svgdefaultstar} alt="default star" />
              </div>
              <img
                src={svgarrowofapp}
                className={`${styles.svgarrowofapp}`}
                alt="arrow"
              />
              <div className="d-flex reset-element mt-4">
                <div className="me-2">
                  <h6 className="card-title text-white">عن دجاجينو</h6>
                  <p className="card-text text-white w-100">
                    حسبة مختلفة لوطن يستاهل
                  </p>
                </div>
                <img src={svgdefaultstar} alt="default star" />
              </div>
            </div>
          </div>
        </div>
        <div className={`col ${styles.imgonres}`}>
          <div className="card bg-transparent border-0">
            <div className="card-body">
              <img
                src={svgmobilephone}
                className={`${styles.svgmobilephone} mt-3`}
                alt="three of circles"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
