import styles from "../scss/OurApplication.module.scss";
import svgsmile from "/smile.svg";
import svgsocial from "/social.svg";

export default function Followus() {
  return (
    <div className="row row-cols-1 row-cols-md-2 g-4 my-4">
      <div className="col" id={`${styles.item2}`}>
        <div className="card border-0">
          <img
            src={svgsocial}
            className={styles.socialmediaimage}
            alt="social media"
          />
        </div>
      </div>
      <div className="col" id={`${styles.item1}`}>
        <div className="card border-0">
          <div className="card-body">
            <h5 className={`card-title fw-bold ${styles.extratext}`}>
              تابعنا على مواقع التواصل
              <span> !</span>
            </h5>
            <img src={svgsmile} alt="smile" />
            <h5 className={`card-title me-5 mt-3 fw-bold ${styles.extratext}`}>
              الاجتماعي حتى لا تفوت أي عرض
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
