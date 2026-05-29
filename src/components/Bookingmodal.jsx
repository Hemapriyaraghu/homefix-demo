import { useState } from "react";
import "./BookingModal.css";

// ── Data ──────────────────────────────────────────────
const serviceCategories = [
  { id: "ac", icon: "❄️", label: "AC Service", services: ["AC Service & Cleaning", "Gas Refill", "AC Installation", "AC Repair"] },
  { id: "washing", icon: "🫧", label: "Washing Machine", services: ["Washing Machine Repair", "Drum Cleaning", "Motor Repair"] },
  { id: "fridge", icon: "🧊", label: "Refrigerator", services: ["Fridge Repair", "Gas Refill", "Cooling Issue Fix"] },
  { id: "tv", icon: "📺", label: "TV / Electronics", services: ["TV Repair", "LED Panel Fix", "Remote Issue"] },
  { id: "plumbing", icon: "🔧", label: "Plumbing", services: ["Pipe Leak Fix", "Tap Replacement", "Drain Cleaning"] },
  { id: "electrical", icon: "⚡", label: "Electrical", services: ["Wiring Fix", "Switch/Socket Repair", "Fan Installation"] },
];

const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM",
];

const getTodayStr = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

const generateBookingId = () =>
  "HFP" + Math.floor(100000 + Math.random() * 900000);

// ── Step Indicator ────────────────────────────────────
const StepIndicator = ({ current }) => {
  const steps = [
    { num: 1, label: "Service" },
    { num: 2, label: "Schedule" },
    { num: 3, label: "Details" },
  ];
  return (
    <div className="bm-steps">
      {steps.map((s, i) => (
        <div key={s.num} className="bm-step-wrapper">
          <div className={`bm-step ${current === s.num ? "bm-step--active" : ""} ${current > s.num ? "bm-step--done" : ""}`}>
            <div className="bm-step__circle">
              {current > s.num ? "✓" : s.num}
            </div>
            <span className="bm-step__label">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`bm-step__line ${current > s.num ? "bm-step__line--done" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────
const BookingModal = ({ isOpen, onClose, preSelectedService = null }) => {
  const [step, setStep] = useState(1);
  const [bookingId] = useState(generateBookingId);
  const [form, setForm] = useState({
    category: preSelectedService || "",
    service: "",
    date: getTodayStr(),
    timeSlot: "",
    address: "",
    landmark: "",
    name: "",
    phone: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const selectedCategory = serviceCategories.find((c) => c.id === form.category);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const canNextStep1 = form.category && form.service;
  const canNextStep2 = form.date && form.timeSlot && form.address.trim().length > 3;
  const canConfirm = form.name.trim().length > 1 && /^[6-9]\d{9}$/.test(form.phone);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleConfirm = () => {
    if (!canConfirm) return;
    setConfirmed(true);
  };

  const handleClose = () => {
    setStep(1);
    setConfirmed(false);
    setForm({ category: "", service: "", date: getTodayStr(), timeSlot: "", address: "", landmark: "", name: "", phone: "" });
    onClose();
  };

  // ── Success Screen ──
  if (confirmed) {
    return (
      <div className="bm-overlay" onClick={handleOverlayClick}>
        <div className="bm-modal bm-modal--success">
          <div className="bm-success-burst">
            <div className="bm-success-icon">✅</div>
          </div>
          <h2 className="bm-success-title">Booking Confirmed!</h2>
          <p className="bm-success-sub">Your service has been scheduled successfully.</p>

          <div className="bm-success-card">
            <div className="bm-success-row">
              <span className="bm-success-key">Booking ID</span>
              <span className="bm-success-val bm-success-val--id">#{bookingId}</span>
            </div>
            <div className="bm-success-row">
              <span className="bm-success-key">Service</span>
              <span className="bm-success-val">{form.service}</span>
            </div>
            <div className="bm-success-row">
              <span className="bm-success-key">Date & Time</span>
              <span className="bm-success-val">{new Date(form.date).toDateString()} · {form.timeSlot}</span>
            </div>
            <div className="bm-success-row">
              <span className="bm-success-key">Address</span>
              <span className="bm-success-val">{form.address}</span>
            </div>
            <div className="bm-success-row">
              <span className="bm-success-key">Mechanic</span>
              <span className="bm-success-val">🧑‍🔧 Assigning nearest pro...</span>
            </div>
          </div>

          <p className="bm-success-note">📱 You'll receive a confirmation SMS on <strong>+91 {form.phone}</strong></p>

          <div className="bm-success-actions">
            <button className="bm-btn bm-btn--outline" onClick={handleClose}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bm-overlay" onClick={handleOverlayClick}>
      <div className="bm-modal">
        {/* Header */}
        <div className="bm-header">
          <div className="bm-header__left">
            <span className="bm-header__icon">🔧</span>
            <div>
              <h2 className="bm-header__title">Book a Service</h2>
              <p className="bm-header__sub">HomeFixPro · Fast & Reliable</p>
            </div>
          </div>
          <button className="bm-close" onClick={handleClose}>✕</button>
        </div>

        <StepIndicator current={step} />

        <div className="bm-body">

          {/* ══ STEP 1 — Service ══ */}
          {step === 1 && (
            <div className="bm-step-content">
              <h3 className="bm-step-title">What service do you need?</h3>

              <div className="bm-categories">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`bm-category ${form.category === cat.id ? "bm-category--active" : ""}`}
                    onClick={() => { update("category", cat.id); update("service", ""); }}
                  >
                    <span className="bm-category__icon">{cat.icon}</span>
                    <span className="bm-category__label">{cat.label}</span>
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <div className="bm-services">
                  <p className="bm-services__label">Select specific service:</p>
                  <div className="bm-service-list">
                    {selectedCategory.services.map((svc) => (
                      <button
                        key={svc}
                        className={`bm-service-item ${form.service === svc ? "bm-service-item--active" : ""}`}
                        onClick={() => update("service", svc)}
                      >
                        {form.service === svc ? "✅" : "○"} {svc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ STEP 2 — Schedule & Address ══ */}
          {step === 2 && (
            <div className="bm-step-content">
              <h3 className="bm-step-title">When & where?</h3>

              <div className="bm-field">
                <label className="bm-label">📅 Select Date</label>
                <input
                  type="date"
                  className="bm-input"
                  min={getTodayStr()}
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                />
              </div>

              <div className="bm-field">
                <label className="bm-label">🕐 Select Time Slot</label>
                <div className="bm-timeslots">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      className={`bm-timeslot ${form.timeSlot === t ? "bm-timeslot--active" : ""}`}
                      onClick={() => update("timeSlot", t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bm-field">
                <label className="bm-label">📍 Full Address</label>
                <textarea
                  className="bm-input bm-textarea"
                  placeholder="Door no, Street, Area, City..."
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bm-field">
                <label className="bm-label">🏁 Landmark <span className="bm-optional">(optional)</span></label>
                <input
                  type="text"
                  className="bm-input"
                  placeholder="e.g. Near Reliance Fresh"
                  value={form.landmark}
                  onChange={(e) => update("landmark", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ══ STEP 3 — Contact Details ══ */}
          {step === 3 && (
            <div className="bm-step-content">
              <h3 className="bm-step-title">Your contact details</h3>

              {/* Summary */}
              <div className="bm-summary">
                <div className="bm-summary__row">
                  <span>🔧 Service</span>
                  <strong>{form.service}</strong>
                </div>
                <div className="bm-summary__row">
                  <span>📅 Date</span>
                  <strong>{new Date(form.date).toDateString()}</strong>
                </div>
                <div className="bm-summary__row">
                  <span>🕐 Time</span>
                  <strong>{form.timeSlot}</strong>
                </div>
                <div className="bm-summary__row">
                  <span>📍 Address</span>
                  <strong>{form.address}</strong>
                </div>
              </div>

              <div className="bm-field">
                <label className="bm-label">👤 Full Name</label>
                <input
                  type="text"
                  className="bm-input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>

              <div className="bm-field">
                <label className="bm-label">📱 Phone Number</label>
                <div className="bm-phone-wrap">
                  <span className="bm-phone-prefix">+91</span>
                  <input
                    type="tel"
                    className="bm-input bm-input--phone"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
                  />
                </div>
                {form.phone.length > 0 && !/^[6-9]\d{9}$/.test(form.phone) && (
                  <p className="bm-error">Please enter a valid 10-digit Indian mobile number</p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bm-footer">
          {step > 1 && (
            <button className="bm-btn bm-btn--outline" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
          )}
          {step < 3 && (
            <button
              className={`bm-btn bm-btn--primary ${(step === 1 && !canNextStep1) || (step === 2 && !canNextStep2) ? "bm-btn--disabled" : ""}`}
              onClick={() => { if ((step === 1 && canNextStep1) || (step === 2 && canNextStep2)) setStep(step + 1); }}
            >
              Continue →
            </button>
          )}
          {step === 3 && (
            <button
              className={`bm-btn bm-btn--primary ${!canConfirm ? "bm-btn--disabled" : ""}`}
              onClick={handleConfirm}
            >
              ✅ Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;