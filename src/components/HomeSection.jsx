import styles from "../scss/HomeSection.module.scss";
import svgcirclelarge from "/circlelarge.svg";
import svgandroid from "/android.svg";
import svgphones from "/phones.svg";
import svgIOS from "/IOS.svg";

export default function HomeSection() {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col" id={`${styles.item2}`}>
          <div className="card bg-transparent border-0">
            <div className="card-body">
              <img
                src={svgphones}
                className="card-img-top slide-left-in-animations"
                alt="phones"
              />
            </div>
          </div>
        </div>
        <div className="col" id={`${styles.item1}`}>
          <div className="card bg-transparent border-0">
            <img
              src={svgcirclelarge}
              className={`${styles.svgcirclelarge}`}
              alt="circlelarge"
            />
            <img
              src={svgcirclelarge}
              className={`${styles.svgcirclemedium}`}
              alt="circlelarge"
            />
            <img
              src={svgcirclelarge}
              className={`${styles.svgcirclesmall}`}
              alt="circlelarge"
            />
            <div className="card-body mt-5">
              <h5 className={`card-title fw-bolder mt-4 ${styles.extratext}`}>
                دليل المطاعم والمقاهي
              </h5>
              <p className="card-text mt-4">
                من خلال فريقنا العماني بأكمله، عملنا جاهدين لنقدم لك أفضل تجربة
                قيادة وبأسعار معقولة جدًا. من خلال فريقنا العماني بأكمله، عملنا
                جاهدين لنقدم لك أفضل تجربة قيادة وبأسعار معقولة جدًا.
              </p>
              <p className="card-text mt-4">
                من خلال فريقنا العماني بأكمله، عملنا جاهدين لنقدم لك أفضل تجربة
                قيادة وبأسعار معقولة جدًا. من خلال فريقنا العماني بأكمله، .
              </p>
              <div className={`${styles.homesectionimages} mt-5`}>
                <a href="!#">
                  <img src={svgandroid} alt="for android" />
                </a>
                <a href="!#">
                  <img src={svgIOS} alt="for IOS" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
