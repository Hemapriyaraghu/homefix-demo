import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Servicemandashboard.css";

// ── Mock Data ──────────────────────────────────────────
const mechanic = {
  name: "Arjun Selvam",
  skill: "AC Technician",
  city: "Chennai",
  avatar: "🧑‍🔧",
  rating: 4.9,
  totalJobs: 142,
  memberSince: "Jan 2024",
  phone: "+91 98765 43210",
  email: "arjun@example.com",
  verified: true,
};

const todayJobs = [
  { id: "JB001", customer: "Meena R.", service: "AC Service & Gas Refill", address: "Anna Nagar, Chennai", time: "10:00 AM", status: "confirmed" },
  { id: "JB002", customer: "Karthik S.", service: "AC Installation", address: "Velachery, Chennai", time: "1:30 PM", status: "pending" },
  { id: "JB003", customer: "Priya M.", service: "AC Repair", address: "T. Nagar, Chennai", time: "4:00 PM", status: "confirmed" },
];

const jobHistory = [
  { id: "JB098", customer: "Ravi K.", service: "AC Repair", date: "24 May 2026", amount: "₹399", rating: 5, status: "completed" },
  { id: "JB097", customer: "Sunita P.", service: "AC Service", date: "22 May 2026", amount: "₹699", rating: 5, status: "completed" },
  { id: "JB096", customer: "Deepak N.", service: "AC Installation", date: "20 May 2026", amount: "₹499", rating: 4, status: "completed" },
  { id: "JB095", customer: "Anita R.", service: "Gas Refill", date: "18 May 2026", amount: "₹699", rating: 5, status: "completed" },
  { id: "JB094", customer: "Vijay T.", service: "AC Repair", date: "15 May 2026", amount: "₹399", rating: 4, status: "completed" },
  { id: "JB093", customer: "Lakshmi B.", service: "AC Service", date: "12 May 2026", amount: "₹699", rating: 5, status: "completed" },
];

const reviews = [
  { customer: "Meena R.", rating: 5, comment: "Arjun was very professional and fixed the AC quickly. Highly recommend!", date: "24 May 2026" },
  { customer: "Ravi K.", rating: 5, comment: "Excellent work! Very clean and thorough. Will book again.", date: "22 May 2026" },
  { customer: "Deepak N.", rating: 4, comment: "Good service, came on time. Explained the issue clearly.", date: "20 May 2026" },
  { customer: "Sunita P.", rating: 5, comment: "Amazing! Fixed the gas leak and did a full service. Worth every rupee.", date: "18 May 2026" },
];

const earnings = {
  today: "₹1,597",
  thisWeek: "₹6,890",
  thisMonth: "₹24,340",
  pending: "₹898",
};

// ── Helpers ────────────────────────────────────────────
const Stars = ({ count }) => (
  <span className="stars">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={i <= count ? "star star--filled" : "star"}>★</span>
    ))}
  </span>
);

const StatusBadge = ({ status }) => (
  <span className={`badge badge--${status}`}>
    {status === "confirmed" ? "✅ Confirmed" : status === "pending" ? "⏳ Pending" : "✔ Completed"}
  </span>
);

// ── Main Component ─────────────────────────────────────
const ServicemanDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: "⚡" },
    { id: "jobs", label: "Today's Jobs", icon: "📋" },
    { id: "history", label: "Job History", icon: "🗂" },
    { id: "earnings", label: "Earnings", icon: "💰" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "reviews", label: "Reviews", icon: "⭐" },
  ];

  return (
    <div className="sd-root">
      {/* ── Sidebar ── */}
      <aside className={`sd-sidebar ${menuOpen ? "sd-sidebar--open" : ""}`}>
        <div className="sd-sidebar__brand">
          <span className="sd-brand-icon">🔧</span>
          <span className="sd-brand-name">HomeFixPro</span>
        </div>

        <div className="sd-sidebar__profile">
          <div className="sd-avatar">{mechanic.avatar}</div>
          <div>
            <p className="sd-profile-name">{mechanic.name}</p>
            <p className="sd-profile-skill">{mechanic.skill}</p>
            {mechanic.verified && <span className="sd-verified">✔ Verified</span>}
          </div>
        </div>

        <nav className="sd-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`sd-nav__item ${activeTab === tab.id ? "sd-nav__item--active" : ""}`}
              onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
            >
              <span className="sd-nav__icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <button className="sd-logout" onClick={() => navigate("/login")}>
          🚪 Logout
        </button>
      </aside>

      {/* ── Main ── */}
      <main className="sd-main">
        {/* Topbar */}
        <header className="sd-topbar">
          <button className="sd-hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div className="sd-topbar__title">
            {tabs.find((t) => t.id === activeTab)?.icon}{" "}
            {tabs.find((t) => t.id === activeTab)?.label}
          </div>
          <div className="sd-topbar__right">
            <span className="sd-topbar__city">📍 {mechanic.city}</span>
          </div>
        </header>

        <div className="sd-content">

          {/* ══ OVERVIEW ══ */}
          {activeTab === "overview" && (
            <div className="sd-section sd-overview">
              <div className="sd-welcome">
                <h1>Good morning, {mechanic.name.split(" ")[0]}! 👋</h1>
                <p>You have <strong>{todayJobs.length} jobs</strong> scheduled today.</p>
              </div>

              {/* Stat Cards */}
              <div className="sd-stats-grid">
                <div className="sd-stat-card sd-stat-card--orange">
                  <span className="sd-stat-card__icon">💰</span>
                  <div>
                    <p className="sd-stat-card__value">{earnings.today}</p>
                    <p className="sd-stat-card__label">Today's Earnings</p>
                  </div>
                </div>
                <div className="sd-stat-card">
                  <span className="sd-stat-card__icon">📋</span>
                  <div>
                    <p className="sd-stat-card__value">{todayJobs.length}</p>
                    <p className="sd-stat-card__label">Jobs Today</p>
                  </div>
                </div>
                <div className="sd-stat-card">
                  <span className="sd-stat-card__icon">⭐</span>
                  <div>
                    <p className="sd-stat-card__value">{mechanic.rating}</p>
                    <p className="sd-stat-card__label">Your Rating</p>
                  </div>
                </div>
                <div className="sd-stat-card">
                  <span className="sd-stat-card__icon">✅</span>
                  <div>
                    <p className="sd-stat-card__value">{mechanic.totalJobs}</p>
                    <p className="sd-stat-card__label">Total Jobs Done</p>
                  </div>
                </div>
              </div>

              {/* Today's Jobs Preview */}
              <div className="sd-card">
                <div className="sd-card__header">
                  <h3>Today's Schedule</h3>
                  <button className="sd-link" onClick={() => setActiveTab("jobs")}>View all →</button>
                </div>
                <div className="sd-job-list">
                  {todayJobs.map((job) => (
                    <div className="sd-job-item" key={job.id}>
                      <div className="sd-job-time">{job.time}</div>
                      <div className="sd-job-info">
                        <p className="sd-job-name">{job.service}</p>
                        <p className="sd-job-customer">👤 {job.customer} · 📍 {job.address}</p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews Preview */}
              <div className="sd-card">
                <div className="sd-card__header">
                  <h3>Recent Reviews</h3>
                  <button className="sd-link" onClick={() => setActiveTab("reviews")}>View all →</button>
                </div>
                <div className="sd-reviews-preview">
                  {reviews.slice(0, 2).map((r, i) => (
                    <div className="sd-review-item" key={i}>
                      <div className="sd-review-top">
                        <span className="sd-review-customer">{r.customer}</span>
                        <Stars count={r.rating} />
                      </div>
                      <p className="sd-review-comment">"{r.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ TODAY'S JOBS ══ */}
          {activeTab === "jobs" && (
            <div className="sd-section">
              <div className="sd-section-header">
                <h2>Today's Jobs</h2>
                <p>Thursday, 28 May 2026</p>
              </div>
              <div className="sd-job-cards">
                {todayJobs.map((job) => (
                  <div className="sd-job-card" key={job.id}>
                    <div className="sd-job-card__top">
                      <div>
                        <span className="sd-job-id">{job.id}</span>
                        <h3>{job.service}</h3>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                    <div className="sd-job-card__details">
                      <p>👤 <strong>Customer:</strong> {job.customer}</p>
                      <p>📍 <strong>Address:</strong> {job.address}</p>
                      <p>🕐 <strong>Time:</strong> {job.time}</p>
                    </div>
                    <div className="sd-job-card__actions">
                      <button className="sd-btn sd-btn--outline">📞 Call Customer</button>
                      <button className="sd-btn sd-btn--primary">✅ Mark Complete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ JOB HISTORY ══ */}
          {activeTab === "history" && (
            <div className="sd-section">
              <div className="sd-section-header">
                <h2>Job History</h2>
                <p>{jobHistory.length} completed jobs</p>
              </div>
              <div className="sd-card">
                <div className="sd-table-wrap">
                  <table className="sd-table">
                    <thead>
                      <tr>
                        <th>Job ID</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Rating</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobHistory.map((job) => (
                        <tr key={job.id}>
                          <td className="sd-job-id">{job.id}</td>
                          <td>{job.customer}</td>
                          <td>{job.service}</td>
                          <td>{job.date}</td>
                          <td><strong>{job.amount}</strong></td>
                          <td><Stars count={job.rating} /></td>
                          <td><StatusBadge status={job.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ══ EARNINGS ══ */}
          {activeTab === "earnings" && (
            <div className="sd-section">
              <div className="sd-section-header">
                <h2>Earnings Summary</h2>
                <p>Your income breakdown</p>
              </div>
              <div className="sd-earnings-grid">
                <div className="sd-earning-card sd-earning-card--highlight">
                  <p className="sd-earning-label">Today</p>
                  <p className="sd-earning-value">{earnings.today}</p>
                  <p className="sd-earning-sub">3 jobs completed</p>
                </div>
                <div className="sd-earning-card">
                  <p className="sd-earning-label">This Week</p>
                  <p className="sd-earning-value">{earnings.thisWeek}</p>
                  <p className="sd-earning-sub">12 jobs completed</p>
                </div>
                <div className="sd-earning-card">
                  <p className="sd-earning-label">This Month</p>
                  <p className="sd-earning-value">{earnings.thisMonth}</p>
                  <p className="sd-earning-sub">38 jobs completed</p>
                </div>
                <div className="sd-earning-card sd-earning-card--pending">
                  <p className="sd-earning-label">Pending Payout</p>
                  <p className="sd-earning-value">{earnings.pending}</p>
                  <p className="sd-earning-sub">Releases in 2 days</p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="sd-card" style={{ marginTop: "28px" }}>
                <div className="sd-card__header"><h3>May 2026 — Job Breakdown</h3></div>
                <div className="sd-breakdown">
                  {jobHistory.map((job) => (
                    <div className="sd-breakdown-row" key={job.id}>
                      <div>
                        <p className="sd-breakdown-service">{job.service}</p>
                        <p className="sd-breakdown-date">{job.date} · {job.customer}</p>
                      </div>
                      <strong className="sd-breakdown-amount">{job.amount}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ PROFILE ══ */}
          {activeTab === "profile" && (
            <div className="sd-section">
              <div className="sd-section-header">
                <h2>My Profile</h2>
                <p>Manage your details</p>
              </div>
              <div className="sd-profile-card">
                <div className="sd-profile-avatar-wrap">
                  <div className="sd-profile-avatar">{mechanic.avatar}</div>
                  {mechanic.verified && <div className="sd-profile-verified">✔ Verified Pro</div>}
                </div>
                <div className="sd-profile-details">
                  <div className="sd-profile-grid">
                    <div className="sd-profile-field">
                      <label>Full Name</label>
                      <input defaultValue={mechanic.name} />
                    </div>
                    <div className="sd-profile-field">
                      <label>Skill / Trade</label>
                      <input defaultValue={mechanic.skill} />
                    </div>
                    <div className="sd-profile-field">
                      <label>Phone Number</label>
                      <input defaultValue={mechanic.phone} />
                    </div>
                    <div className="sd-profile-field">
                      <label>Email Address</label>
                      <input defaultValue={mechanic.email} />
                    </div>
                    <div className="sd-profile-field">
                      <label>City</label>
                      <input defaultValue={mechanic.city} />
                    </div>
                    <div className="sd-profile-field">
                      <label>Member Since</label>
                      <input defaultValue={mechanic.memberSince} disabled />
                    </div>
                  </div>
                  <button className="sd-btn sd-btn--primary" style={{ marginTop: "24px" }}>
                    💾 Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══ REVIEWS ══ */}
          {activeTab === "reviews" && (
            <div className="sd-section">
              <div className="sd-section-header">
                <h2>Ratings & Reviews</h2>
                <p>{reviews.length} reviews · {mechanic.rating} average</p>
              </div>

              <div className="sd-rating-summary">
                <div className="sd-rating-big">
                  <span className="sd-rating-number">{mechanic.rating}</span>
                  <Stars count={5} />
                  <p>{mechanic.totalJobs} jobs completed</p>
                </div>
                <div className="sd-rating-bars">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = Math.round((count / reviews.length) * 100);
                    return (
                      <div className="sd-rating-bar-row" key={star}>
                        <span>{star}★</span>
                        <div className="sd-rating-bar">
                          <div className="sd-rating-bar__fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="sd-reviews-list">
                {reviews.map((r, i) => (
                  <div className="sd-review-card" key={i}>
                    <div className="sd-review-card__top">
                      <div className="sd-review-card__avatar">{r.customer[0]}</div>
                      <div>
                        <p className="sd-review-card__name">{r.customer}</p>
                        <p className="sd-review-card__date">{r.date}</p>
                      </div>
                      <Stars count={r.rating} />
                    </div>
                    <p className="sd-review-card__comment">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default ServicemanDashboard;