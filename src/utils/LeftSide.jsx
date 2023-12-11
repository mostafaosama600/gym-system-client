/* eslint-disable react/prop-types */

export default function LeftSide({ styles }) {
  return (
    <div className={`col border-0 ${styles.leftside}`} id={`${styles.item2}`}>
      <div className={`card border-0 ${styles.boxofimagelogin}`}>
        <div className={`card-body text-center ${styles.boxofimagecentration}`}>
          {/* <img src={logoDagagino} style={{ width: "300px" }} alt="" /> */}
        </div>
      </div>
    </div>
  );
}
