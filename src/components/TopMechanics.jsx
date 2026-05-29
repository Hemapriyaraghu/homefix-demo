const mechanics = [
  { name: "Rajan Kumar", spec: "AC & fridge specialist", rating: "4.9", reviews: "120", price: "₹299/visit", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80" },
  { name: "Suresh Babu", spec: "washing machine expert", rating: "4.8", reviews: "98", price: "₹249/visit", img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80" },
  { name: "Vikram Singh", spec: "TV & microwave repair", rating: "4.7", reviews: "85", price: "₹349/visit", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" }
]

const TopMechanics = () => {
  return (
    <section style={{
      padding: "40px 20px",
      backgroundColor: "#ffffff"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1d1d1d" }}>
          top rated mechanics
        </h2>
        <span style={{ fontSize: "13px", color: "#f15c22", fontWeight: "600", cursor: "pointer" }}>
          see all →
        </span>
      </div>

      <div style={{
        display: "grid",
       gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px"
      }}>
        {mechanics.map((m, i) => (
          <div key={i} style={{
            borderRadius: "12px",
            border: "1px solid #f0f0f0",
            overflow: "hidden",
            cursor: "pointer",
            transition: "box-shadow 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <img
              src={m.img}
              alt={m.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover"
              }}
            />
            <div style={{ padding: "16px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#1d1d1d" }}>{m.name}</h3>
              <p style={{ fontSize: "12px", color: "#666", margin: "4px 0" }}>{m.spec}</p>
              <p style={{ fontSize: "12px", color: "#f59e0b" }}>★ {m.rating} ({m.reviews} reviews)</p>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "12px"
              }}>
                <span style={{ fontSize: "13px", color: "#f15c22", fontWeight: "600" }}>{m.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopMechanics