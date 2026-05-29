const categories = [
  { name: "AC repair", img: "https://images.unsplash.com/photo-1631567091196-f08ac9e4f5b4?w=200&q=80", price: "starting ₹299" },
  { name: "fridge repair", img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&q=80", price: "starting ₹249" },
  { name: "washing machine", img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=200&q=80", price: "starting ₹199" },
  { name: "television", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=200&q=80", price: "starting ₹349" },
  { name: "geyser repair", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80", price: "starting ₹179" },
  { name: "microwave", img: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200&q=80", price: "starting ₹149" }
]

const Categories = () => {
  return (
    <section style={{
      padding: "40px 20px",
      backgroundColor: "#ffffff"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1d1d1d" }}>
          what are you looking for?
        </h2>
        <span style={{ fontSize: "13px", color: "#f15c22", fontWeight: "600", cursor: "pointer" }}>
          see all →
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "14px"
      }}>
        {categories.map((cat, i) => (
          <div key={i} style={{
            textAlign: "center",
            cursor: "pointer",
            padding: "12px 8px",
            borderRadius: "10px",
            border: "1px solid #f0f0f0",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#f15c22"
            e.currentTarget.style.backgroundColor = "#fff8f5"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "#f0f0f0"
            e.currentTarget.style.backgroundColor = "white"
          }}
          >
            <img
              src={cat.img}
              alt={cat.name}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "8px"
              }}
            />
            <div style={{ fontSize: "12px", color: "#333", fontWeight: "500" }}>{cat.name}</div>
            <div style={{ fontSize: "11px", color: "#f15c22", marginTop: "3px" }}>{cat.price}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories