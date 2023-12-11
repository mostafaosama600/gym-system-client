import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CounterContextProvider from "./context/store";
import RequestReductionPrice from "./pages/RequestReductionPrice";
import GetSupplierProducts from "./pages/GetSupplierProducts";
import ProtectedRoutes from "./security/ProtectedRoutes";
import GetFarmProducts from "./pages/GetFarmProducts";
import SystemProducts from "./pages/SystemProducts";
import DetailsProduct from "./pages/DetailsProduct";
import CreateAccount from "./pages/CreateAccount";
import PageNotFound from "./pages/PageNotFound";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BuyingProcess from "./pages/BuyingProcess";
import User from "./pages/User";
import Analysis from "./pages/Analysis";
import InvoiceDetails from "./pages/InvoiceDetails";

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <>
      <CounterContextProvider>
        <Routes>
          <Route
            index
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="signup"
            element={
              <>
                <Navbar />
                <CreateAccount />
                <Footer />
              </>
            }
          />
          <Route
            path="user-profile"
            element={<ProtectedRoutes element={UserProfile} />}
          />
          <Route
            path="dashboard"
            element={<ProtectedRoutes element={Dashboard} />}
          />
          <Route
            path="settings"
            element={<ProtectedRoutes element={Analysis} />}
          />
          <Route
            path="reduction-price"
            element={<ProtectedRoutes element={RequestReductionPrice} />}
          />
          <Route
            path="reports"
            element={<ProtectedRoutes element={Reports} />}
          />
          <Route
            path="products"
            element={<ProtectedRoutes element={SystemProducts} />}
          />
          <Route
            path="farm-products"
            element={<ProtectedRoutes element={GetFarmProducts} />}
          />
          <Route
            path="supplier-products"
            element={<ProtectedRoutes element={GetSupplierProducts} />}
          />
          <Route
            path="product/details/:id"
            element={<ProtectedRoutes element={DetailsProduct} />}
          />

          <Route
            path="seller-profile/:id"
            element={<ProtectedRoutes element={User} />}
          />
          <Route
            path="buying-process/:prodID/:sellerID/deal-price/:price/discount-widget/:discount/product-name/:prodName/stock/:stock/seller-name/:sellerName"
            element={<ProtectedRoutes element={BuyingProcess} />}
          />
          <Route
            path="invoice-details/:id"
            element={<ProtectedRoutes element={InvoiceDetails} />}
          />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <PageNotFound />
                <Footer />
              </>
            }
          />
        </Routes>
      </CounterContextProvider>
    </>
  );
}
