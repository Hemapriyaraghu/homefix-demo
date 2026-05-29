import { useState } from "react";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const services = [
    "AC Repair",
    "AC Installation",
    "AC Service",
    "Washing Machine Repair",
    "Washing Machine Service",
    "Fridge Repair",
    "Fridge Service",
    "TV Repair",
    "Fan Repair",
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painting",
  ];

  const handleSearch = (value) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = services.filter((service) =>
      service.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filtered);
  };

  const handleSearchClick = () => {
    if (!query.trim()) return;

    setSelectedService(query);
    setResults([]);
  };

  return (
    <section
      style={{
        backgroundColor: "#fff8f5",
        padding: "48px 5% 0",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "24px",
      }}
    >
      {/* Left */}
      <div
        style={{
          flex: "1 1 320px",
          paddingBottom: "40px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#fde8de",
            color: "#f15c22",
            fontSize: "11px",
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "14px",
            fontWeight: "600",
          }}
        >
          ⚡ TRUSTED HOME SERVICE
        </div>

        <h1
          style={{
            fontSize: "36px",
            fontWeight: "800",
            color: "#1d1d1d",
            lineHeight: "1.25",
            marginBottom: "12px",
          }}
        >
          Expert repairs,
          <br />
          at your doorstep
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#666",
            marginBottom: "24px",
            lineHeight: "1.6",
          }}
        >
          Book certified mechanics for AC, fridge,
          <br />
          washing machine & more in minutes!!
        </p>

        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "visible",
            position: "relative",
            border: "1.5px solid #e0e0e0",
            maxWidth: "420px",
          }}
        >
          <input
            placeholder="Search for a service..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchClick();
            }}
            style={{
              flex: 1,
              padding: "12px 14px",
              fontSize: "13px",
              border: "none",
              outline: "none",
            }}
          />

          <button
            onClick={handleSearchClick}
            style={{
              backgroundColor: "#f15c22",
              color: "white",
              border: "none",
              padding: "12px 20px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Search
          </button>

          {results.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: "1.5px solid #e0e0e0",
                borderRadius: "8px",
                marginTop: "4px",
                zIndex: 100,
              }}
            >
              {results.map((service, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setQuery(service);
                    setResults([]);
                  }}
                  style={{
                    padding: "10px 14px",
                    fontSize: "13px",
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  🔧 {service}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedService && (
          <div
            style={{
              marginTop: "14px",
              backgroundColor: "white",
              border: "1px solid #eee",
              padding: "12px",
              borderRadius: "8px",
              maxWidth: "420px",
            }}
          >
            🔧 Selected Service: {selectedService}
          </div>
        )}
      </div>

      {/* Right */}
      <div
        style={{
          flex: "1 1 260px",
          maxWidth: "280px",
          width: "100%", 
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80"
          alt="technician"
          style={{
           width: "100%",
          height: "auto",       // change this
           maxHeight: "260px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;