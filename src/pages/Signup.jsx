import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Serviceman extra fields
  const [skill, setSkill] = useState("");
  const [city, setCity] = useState("");

  const handleSignup = () => {
    if (!name || !email || !phone || !password) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: "Please enter a valid email address.", type: "error" });
      return;
    }
    if (phone.length < 10) {
      setMessage({ text: "Please enter a valid phone number.", type: "error" });
      return;
    }
    if (password.length < 6) {
      setMessage({ text: "Password must be at least 6 characters.", type: "error" });
      return;
    }
    if (role === "serviceman" && (!skill || !city)) {
      setMessage({ text: "Please fill in your skill and city.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    setTimeout(() => {
      setLoading(false);
      setMessage({ text: "Account created! Redirecting...", type: "success" });
      setTimeout(() => {
        if (role === "customer") navigate("/");
        else navigate("/serviceman-dashboard");
      }, 1000);
    }, 1500);
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
            Join the<br />HomeFixPro<br />
            <span>Community.</span>
          </h2>
          <p className="auth-left__sub">
            {role === "customer"
              ? "Get your appliances fixed by verified experts — same day service available."
              : "Turn your skills into a steady income. Join 2,000+ mechanics already earning."}
          </p>
          <div className="auth-left__perks">
            {role === "customer" ? (
              <>
                <div className="perk">✅ Verified & background-checked mechanics</div>
                <div className="perk">✅ Same-day service available</div>
                <div className="perk">✅ 30-day service warranty</div>
                <div className="perk">✅ Transparent pricing, no hidden costs</div>
              </>
            ) : (
              <>
                <div className="perk">💰 Earn ₹500–₹2000 per job</div>
                <div className="perk">📅 Flexible working hours</div>
                <div className="perk">📍 Work in your local area</div>
                <div className="perk">🚀 Free onboarding & training</div>
              </>
            )}
          </div>
        </div>
        <div className="auth-left__blob blob-1" />
        <div className="auth-left__blob blob-2" />
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card auth-card--signup">
          {/* Logo (mobile only) */}
          <div className="auth-card__logo">
            <span>🔧</span> HomeFixPro
          </div>

          <h2 className="auth-card__title">Create your account</h2>
          <p className="auth-card__sub">Join thousands of happy users today</p>

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
              ? "Book home appliance services near you"
              : "Register as a service professional & earn"}
          </p>

          {/* Form */}
          <div className="auth-form">
            <div className="auth-form__row">
              <div className="auth-field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="auth-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Serviceman Extra Fields */}
            {role === "serviceman" && (
              <div className="auth-form__row auth-serviceman-fields">
                <div className="auth-field">
                  <label>Your Skill / Trade</label>
                  <select value={skill} onChange={(e) => setSkill(e.target.value)}>
                    <option value="">Select skill</option>
                    <option>AC Technician</option>
                    <option>Electrician</option>
                    <option>Plumber</option>
                    <option>Appliance Repair</option>
                    <option>Carpenter</option>
                  </select>
                </div>
                <div className="auth-field">
                  <label>Your City</label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            )}

            {message.text && (
              <div className={`auth-message auth-message--${message.type}`}>
                {message.type === "success" ? "✅" : "⚠️"} {message.text}
              </div>
            )}

            <button
              className={`auth-submit ${loading ? "auth-submit--loading" : ""}`}
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                `Create ${role === "customer" ? "Customer" : "Serviceman"} Account`
              )}
            </button>
          </div>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;