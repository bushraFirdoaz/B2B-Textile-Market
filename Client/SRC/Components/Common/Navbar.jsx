import { Link } from "react-router-dom";
import "../../Navbar.css";

function Navbar() {

  return (

    <nav className="navbar">

      {/* =========================================
          LOGO
      ========================================= */}

      <div className="navbar-logo">

        <Link to="/">
          Elanza
        </Link>

      </div>


      {/* =========================================
          NAVIGATION
      ========================================= */}

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/marketplace">
          Marketplace
        </Link>

        <Link to="/marketplace#categories">
          Categories
        </Link>

        <Link to="/">
          About
        </Link>

        <Link to="/my-orders">
          My Orders
        </Link>

        <Link to="/cart">
          🛒 Cart
        </Link>

      </div>


      {/* =========================================
          AUTH BUTTONS
      ========================================= */}

      <div className="navbar-buttons">

        <Link
          to="/buyer/login"
          className="login-btn"
        >
          Login
        </Link>


        <Link
          to="/buyer/signup"
          className="signup-btn"
        >
          Sign Up
        </Link>

      </div>

    </nav>

  );
}

export default Navbar;