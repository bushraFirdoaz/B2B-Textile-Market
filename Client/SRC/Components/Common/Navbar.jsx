import "../../Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}

      <div className="navbar-logo">
        <a href="/">
          Elanza
        </a>
      </div>


      {/* Navigation */}

      <div className="navbar-links">

        <a href="/">
          Home
        </a>

        <a href="/marketplace">
          Marketplace
        </a>

        <a href="#">
          Categories
        </a>

        <a href="#">
          About
        </a>

        <a href="/my-orders">
          My Orders
        </a>

        <a href="/cart">
          🛒 Cart
        </a>

      </div>


      {/* Buttons */}

      <div className="navbar-buttons">

        <button className="login-btn">
          Login
        </button>

        <button className="signup-btn">
          Sign Up
        </button>

      </div>

    </nav>
  );
}

export default Navbar;