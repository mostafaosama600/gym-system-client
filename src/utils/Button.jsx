/* eslint-disable react/prop-types */
import styles from "../scss/Navbar.module.scss";

export default function Button({
  children,
  type,
  onClick,
  className,
  disabled,
}) {
  return (
    <button
      className={`btn m-2 ${styles[type]} ${className}`}
      onClick={onClick}
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
