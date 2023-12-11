/* eslint-disable react/prop-types */

export default function ErrorMsg({ message }) {
  return (
    <p
      style={{
        textAlign: "center",
        fontSize: "2rem",
        padding: "4.8rem",
      }}
    >
      <span>⛔ {message}</span>
    </p>
  );
}
