/* eslint-disable react/prop-types */
export default function Loader({ className, style }) {
  return (
    <div className="container" style={style}>
      <div
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: "2rem",
          fontWeight: "600",
          margin: "4.8rem",
        }}
        className={className}
      >
        <div className="spinner-grow bg-orange" role="status">
          <span className="visually-hidden">...</span>
        </div>
      </div>
    </div>
  );
}
