/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReportsBtn from "../utils/ReportsBtn";

export default function ProtectedRoutes({ element: Component }) {
  if (localStorage.getItem("userToken")) {
    return (
      <>
        <Navbar />
        <ReportsBtn />
        <Component />
        <Footer />
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
