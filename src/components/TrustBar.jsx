import "./TrustBar.css";

const trustItems = [
  { icon: "✅", label: "Verified Professionals" },
  { icon: "🛡️", label: "100% Safe & Insured" },
  { icon: "⭐", label: "4.8+ Rated Service" },
  { icon: "🔁", label: "Free Re-service Guarantee" },
  { icon: "💳", label: "Secure Payments" },
];

const TrustBar = () => {
  return (
    <section className="trust-bar">
      <div className="trust-bar__inner">
        {trustItems.map((item, index) => (
          <div className="trust-bar__item" key={index}>
            <span className="trust-bar__icon">{item.icon}</span>
            <span className="trust-bar__label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;