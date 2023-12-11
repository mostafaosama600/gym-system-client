import styles from "../scss/Navbar.module.scss";
import svgsmallcircles from "/smallcircles.svg";

export default function Footer() {
  return (
    <div className="container-fluid footer mt-4">
      <div className={`me-4 d-flex ${styles.footercontent}`}>
        <img
          src={svgsmallcircles}
          className={`${styles.onmobile} brand-image`}
          alt="smallcircles"
        />
        <p className="card-text text-center text-white mt-1 fw-bold">
          جميع الحقوق محفوظه لدي موقع دجاجينو
        </p>
        <a className={`navbar-brand text-white ${styles.onmobile}`}>دجاجينو</a>
      </div>
    </div>
  );
}
