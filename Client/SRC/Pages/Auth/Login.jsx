import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  // Determine role from URL
  const isSupplier = location.pathname.includes("supplier");

  const role = isSupplier ? "Supplier" : "Buyer";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    // Demo login
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        email,
        role,
      })
    );

    alert(`${role} login successful!`);

    if (isSupplier) {
      navigate("/supplier/dashboard");
    } else {
      navigate("/buyer/dashboard");
    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          Elanza
        </div>

        <div className="auth-role-badge">
          {isSupplier ? "🏭 Supplier Login" : "🛍️ Buyer Login"}
        </div>

        <h1>
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to your {role.toLowerCase()} account.
        </p>


        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="auth-form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* Password */}

          <div className="auth-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          <button
            type="submit"
            className={
              isSupplier
                ? "auth-submit supplier-auth-submit"
                : "auth-submit"
            }
          >
            Login as {role}
          </button>

        </form>


        <div className="auth-switch">

          <p>
            Don't have an account?
          </p>

          <Link
            to={
              isSupplier
                ? "/supplier/signup"
                : "/buyer/signup"
            }
          >
            Create {role} Account
          </Link>

        </div>


        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;