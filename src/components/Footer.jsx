const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#1d1d1d", padding: "48px 40px 24px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "32px",
        marginBottom: "40px"
      }}>
        <div>
          <div style={{ fontSize: "22px", fontWeight: "700", color: "white", marginBottom: "12px" }}>
            HomeFix<span style={{ color: "#f15c22" }}>Pro</span>
          </div>
          <p style={{ fontSize: "13px", color: "#aaa", lineHeight: "1.7", marginBottom: "20px", maxWidth: "260px" }}>
            India's most trusted home appliance repair service. Certified mechanics at your doorstep!!
          </p>
        </div>
      </div>
      <div style={{ borderTop: "0.5px solid #333", paddingTop: "20px" }}>
        <span style={{ fontSize: "12px", color: "#666" }}>© 2025 HomeFixPro. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;