import { Link } from "react-router-dom";
import "./BuyerDashboard.css";

function BuyerDashboard() {

  const savedUser =
    JSON.parse(
      localStorage.getItem("buyerAccount")
    );

  return (
    <div className="buyer-dashboard">

      <div className="buyer-dashboard-content">

        <div className="buyer-dashboard-badge">
          🛍️ BUYER DASHBOARD
        </div>

        <h1>
          Welcome
          {savedUser?.name
            ? `, ${savedUser.name}`
            : ", Buyer"}!
        </h1>

        <p>
          Explore fabrics, connect with suppliers,
          and manage your orders from one place.
        </p>


        <div className="buyer-dashboard-actions">

          <Link
            to="/marketplace"
            className="buyer-dashboard-btn primary"
          >
            🛍️ Explore Marketplace
          </Link>

          <Link
            to="/my-orders"
            className="buyer-dashboard-btn"
          >
            📦 My Orders
          </Link>

          <Link
            to="/cart"
            className="buyer-dashboard-btn"
          >
            🛒 My Cart
          </Link>

        </div>

      </div>

    </div>
  );
}

export default BuyerDashboard;