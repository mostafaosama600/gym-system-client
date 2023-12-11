import styles from "../scss/Reports.module.scss";
import { NavLink } from "react-router-dom";
import Button from "../utils/Button";
import { useContext } from "react";
import { CounterContext } from "../context/store";

export default function ReportsBtn() {
  const { loginUser } = useContext(CounterContext);
  if (loginUser) {
    return (
      <div className={`${styles.reports}`}>
        <NavLink to="/reports">
          <Button className={`${styles.reportsBtn}`}>الشكاوي</Button>
        </NavLink>
      </div>
    );
  } else {
    return "";
  }
}
