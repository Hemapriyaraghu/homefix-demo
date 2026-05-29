import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: "Please enter a valid email address.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    setTimeout(() => {
      setLoading(false);
      setMessage({ text: `Welcome back! Redirecting...`, type: "success" });
      setTimeout(() => {
        if (role === "customer") navigate("/");
        else navigate("/serviceman-dashboard");
      }, 1000);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left__content">
          <div className="auth-brand">
            <span className="auth-brand__icon">🔧</span>
            <span className="auth-brand__name">HomeFixPro</span>
          </div>
          <h2 className="auth-left__title">
            Fix anything.<br />Book anyone.<br />
            <span>Instantly.</span>
          </h2>
          <p className="auth-left__sub">
            Trusted by 50,000+ homeowners across India for fast, reliable home appliance services.
          </p>
          <div className="auth-left__stats">
            <div className="auth-stat">
              <strong>50K+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="auth-stat">
              <strong>2K+</strong>
              <span>Expert Mechanics</span>
            </div>
            <div className="auth-stat">
              <strong>4.9★</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
        <div className="auth-left__blob blob-1" />
        <div className="auth-left__blob blob-2" />
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card">
          <span
  onClick={() => navigate("/")}
  style={{
    fontSize: "13px",
    color: "#f15c22",
    cursor: "pointer",
    fontWeight: "600",
    display: "inline-block",
    marginBottom: "16px"
  }}
>
  ← back
</span>
          {/* Logo (mobile only) */}
          <div className="auth-card__logo">
            <span>🔧</span> HomeFixPro
          </div>

          <h2 className="auth-card__title">Welcome back</h2>
          <p className="auth-card__sub">Sign in to your account to continue</p>

          {/* Role Toggle */}
          <div className="role-toggle">
            <button
              className={`role-btn ${role === "customer" ? "role-btn--active" : ""}`}
              onClick={() => setRole("customer")}
            >
              🏠 Customer
            </button>
            <button
              className={`role-btn ${role === "serviceman" ? "role-btn--active" : ""}`}
              onClick={() => setRole("serviceman")}
            >
              🔧 Serviceman
            </button>
          </div>

          <p className="role-hint">
            {role === "customer"
              ? "Book services for your home appliances"
              : "Manage your jobs and grow your business"}
          </p>

          {/* Form */}
          <div className="auth-form">
            <div className="auth-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="auth-field">
              <label>
                Password
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="auth-forgot">
              <a href="#">Forgot password?</a>
            </div>

            {message.text && (
              <div className={`auth-message auth-message--${message.type}`}>
                {message.type === "success" ? "✅" : "⚠️"} {message.text}
              </div>
            )}

            <button
              className={`auth-submit ${loading ? "auth-submit--loading" : ""}`}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                `Login as ${role === "customer" ? "Customer" : "Serviceman"}`
              )}
            </button>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;