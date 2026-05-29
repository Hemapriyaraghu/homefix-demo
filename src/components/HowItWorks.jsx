const steps = [
  { num: "1", title: "choose service", desc: "select your appliance and describe the problem you're facing", icon: "🔍" },
  { num: "2", title: "book mechanic", desc: "pick a certified mechanic and choose your preferred time slot", icon: "📅" },
  { num: "3", title: "get it fixed", desc: "mechanic arrives at your home and fixes your appliance", icon: "✅" }
]

const HowItWorks = () => {
  return (
    <section style={{
      padding: "40px 20px",
      backgroundColor: "#f9f9f9"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1d1d1d" }}>
          how it works
        </h2>
        <span style={{ fontSize: "13px", color: "#f15c22", fontWeight: "600" }}>
          learn more →
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {steps.map((step, i) => (
          <div key={i} style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "28px 24px",
            textAlign: "center",
            border: "1px solid #f0f0f0"
          }}>
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>{step.icon}</div>
            <div style={{
              width: "36px",
              height: "36px",
              backgroundColor: "#f15c22",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "700",
              margin: "0 auto 14px"
            }}>{step.num}</div>
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1d", marginBottom: "8px" }}>
              {step.title}
            </h3>
            <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks