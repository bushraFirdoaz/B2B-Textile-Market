import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* Main Hero Section */}
      <section className="home-hero">

        <div className="home-content">

          <div className="home-badge">
            ✦ B2B TEXTILE MARKETPLACE
          </div>

          <h1>
            Elanza
          </h1>

          <h2>
            B2B Textile Marketplace
          </h2>

          <p>
            Welcome to Elanza, a B2B textile marketplace connecting
            buyers and suppliers.
          </p>


          {/* BUYER SECTION */}

          <div className="home-role-section">

            <h3>
              Are you a Buyer?
            </h3>

            <p>
              Discover quality fabrics and connect with trusted suppliers.
            </p>

            <div className="home-buttons">

              <Link
                to="/buyer/login"
                className="home-btn buyer-login-btn"
              >
                Buyer Login
              </Link>

              <Link
                to="/buyer/signup"
                className="home-btn buyer-signup-btn"
              >
                Buyer Sign Up
              </Link>

            </div>

          </div>


          {/* SUPPLIER SECTION */}

          <div className="home-role-section supplier-role-section">

            <h3>
              Are you a Supplier?
            </h3>

            <p>
              List your textile products and connect with buyers.
            </p>

            <div className="home-buttons">

              <Link
                to="/supplier/login"
                className="home-btn supplier-login-btn"
              >
                Supplier Login
              </Link>

              <Link
                to="/supplier/signup"
                className="home-btn supplier-signup-btn"
              >
                Sign Up as Supplier
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;