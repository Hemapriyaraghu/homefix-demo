import { Link } from "react-router-dom";
import { useState } from "react";
import BookingModal from "../components/BookingModal";

const Navbar = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
     <nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    padding: "14px 20px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #f0f0f0",
    position: "sticky",
    top: "0",
    zIndex: "1000",
  }}
>
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#1d1d1d",
            textDecoration: "none",
          }}
        >
          HomeFix<span style={{ color: "#f15c22" }}>Pro</span>
        </Link>

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { name: "services", path: "/services" },
            { name: "how it works", path: "/" },
            { name: "about", path: "/" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              style={{
                fontSize: "14px",
                color: "#555",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "#555",
              fontWeight: "500",
            }}
          >
            login
          </Link>

          <button
            onClick={() => setIsBookingOpen(true)}
            style={{
              backgroundColor: "#f15c22",
              color: "white",
              border: "none",
              padding: "9px 22px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            book now
          </button>
        </div>
      </nav>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default Navbar;