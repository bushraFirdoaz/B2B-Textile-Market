import { BrowserRouter, Routes, Route } from "react-router-dom";

// =========================================
// BUYER PAGES
// =========================================

import Cart from "./Pages/Buyer/Cart";
import ProductDetails from "./Pages/Buyer/ProductDetails";
import Checkout from "./Pages/Buyer/Checkout";
import OrderConfirmation from "./Pages/Buyer/OrderConfirmation";
import Marketplace from "./Pages/Buyer/Marketplace";
import MyOrders from "./Pages/Buyer/MyOrders";
import MyInquiries from "./Pages/Buyer/MyInquiries";

// =========================================
// BUYER AUTHENTICATION
// =========================================

import BuyerLogin from "./Pages/Auth/Login";
import BuyerSignup from "./Pages/Auth/Signup";

// =========================================
// COMMON
// =========================================

import Navbar from "./components/common/Navbar";

// =========================================
// SUPPLIER PAGES
// =========================================

import SupplierDashboard from "./Pages/Supplier/SupplierDashboard";
import AddProduct from "./Pages/Supplier/AddProduct";
import EditProduct from "./Pages/Supplier/EditProduct";
import SupplierOrders from "./Pages/Supplier/SupplierOrders";
import SupplierOrderDetails from "./Pages/Supplier/SupplierOrderDetails";


// =========================================
// HOME
// =========================================

function Home() {
  return (
    <div className="home-page">

      <h1>
        Elanza - B2B Textile Marketplace
      </h1>

      <p>
        Welcome to Elanza, a B2B textile marketplace
        connecting buyers and suppliers.
      </p>

    </div>
  );
}


// =========================================
// APP
// =========================================

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* =========================================
            HOME
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================================
            BUYER AUTHENTICATION
        ========================================= */}

        <Route
          path="/buyer/login"
          element={<BuyerLogin />}
        />

        <Route
          path="/buyer/signup"
          element={<BuyerSignup />}
        />


        {/* =========================================
            BUYER ROUTES
        ========================================= */}

        <Route
          path="/marketplace"
          element={<Marketplace />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/my-inquiries"
          element={<MyInquiries />}
        />


        {/* =========================================
            SUPPLIER ROUTES
        ========================================= */}

        <Route
          path="/supplier/dashboard"
          element={<SupplierDashboard />}
        />

        <Route
          path="/supplier/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/supplier/edit-product/:id"
          element={<EditProduct />}
        />

        <Route
          path="/supplier/orders"
          element={<SupplierOrders />}
        />

        <Route
          path="/supplier/order/:id"
          element={<SupplierOrderDetails />}
        />


        {/* =========================================
            FALLBACK
        ========================================= */}

        <Route
          path="*"
          element={
            <div style={{ padding: "40px" }}>

              <h1>
                404 - Page Not Found
              </h1>

              <p>
                The page you are trying to access does not exist.
              </p>

            </div>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;