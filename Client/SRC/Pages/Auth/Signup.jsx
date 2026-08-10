import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";

function Signup() {

  const navigate = useNavigate();
  const location = useLocation();

  const isSupplier = location.pathname.includes("supplier");

  const role = isSupplier ? "Supplier" : "Buyer";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password,
      role,
    };

    // Save demo account
    localStorage.setItem(
      isSupplier
        ? "supplierAccount"
        : "buyerAccount",
      JSON.stringify(user)
    );

    alert(
      `${role} account created successfully!`
    );

    // Direct user to login
    navigate(
      isSupplier
        ? "/supplier/login"
        : "/buyer/login"
    );
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          Elanza
        </div>

        <div className="auth-role-badge">
          {isSupplier
            ? "🏭 Supplier Registration"
            : "🛍️ Buyer Registration"}
        </div>

        <h1>
          Create Account
        </h1>

        <p className="auth-subtitle">
          Join Elanza as a {role.toLowerCase()}.
        </p>


        <form onSubmit={handleSignup}>

          {/* Name */}

          <div className="auth-form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


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
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              minLength="6"
            />

          </div>


          {/* Confirm Password */}

          <div className="auth-form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
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
            Create {role} Account
          </button>

        </form>


        <div className="auth-switch">

          <p>
            Already have an account?
          </p>

          <Link
            to={
              isSupplier
                ? "/supplier/login"
                : "/buyer/login"
            }
          >
            Login as {role}
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

export default Signup;