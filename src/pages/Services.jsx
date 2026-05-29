import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Services.css";

const allServices = [
  { id: 1, category: "AC", icon: "❄️", name: "AC Installation", price: "₹499", time: "60 min", rating: 4.8 },
  { id: 2, category: "AC", icon: "❄️", name: "AC Service & Gas Refill", price: "₹699", time: "90 min", rating: 4.7 },
  { id: 3, category: "AC", icon: "❄️", name: "AC Repair", price: "₹399", time: "45 min", rating: 4.9 },
  { id: 4, category: "Washing Machine", icon: "🫧", name: "Washing Machine Repair", price: "₹349", time: "60 min", rating: 4.6 },
  { id: 5, category: "Washing Machine", icon: "🫧", name: "Washing Machine Service", price: "₹299", time: "45 min", rating: 4.7 },
  { id: 6, category: "Refrigerator", icon: "🧊", name: "Fridge Repair", price: "₹399", time: "60 min", rating: 4.8 },
  { id: 7, category: "Refrigerator", icon: "🧊", name: "Fridge Deep Clean", price: "₹249", time: "30 min", rating: 4.5 },
  { id: 8, category: "Plumbing", icon: "🔧", name: "Pipe Leak Fix", price: "₹199", time: "30 min", rating: 4.7 },
  { id: 9, category: "Plumbing", icon: "🔧", name: "Tap & Faucet Repair", price: "₹149", time: "20 min", rating: 4.6 },
  { id: 10, category: "Plumbing", icon: "🔧", name: "Bathroom Fitting", price: "₹599", time: "120 min", rating: 4.9 },
  { id: 11, category: "Electrical", icon: "⚡", name: "Fan Installation", price: "₹199", time: "30 min", rating: 4.8 },
  { id: 12, category: "Electrical", icon: "⚡", name: "Switchboard Repair", price: "₹249", time: "40 min", rating: 4.7 },
  { id: 13, category: "Electrical", icon: "⚡", name: "MCB / Wiring Work", price: "₹349", time: "60 min", rating: 4.6 },
  { id: 14, category: "Microwave", icon: "📡", name: "Microwave Repair", price: "₹299", time: "45 min", rating: 4.5 },
  { id: 15, category: "TV", icon: "📺", name: "TV Repair", price: "₹499", time: "60 min", rating: 4.7 },
  { id: 16, category: "TV", icon: "📺", name: "TV Wall Mounting", price: "₹299", time: "45 min", rating: 4.8 },
];

const categories = ["All", ...new Set(allServices.map((s) => s.category))];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allServices.filter((s) => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Navbar />
      <div className="services-page">
        {/* Page Header */}
        <div className="services-hero">
          <h1>Our Services</h1>
          <p>Professional home appliance repair & installation — at your doorstep.</p>
          <input
            className="services-search"
            type="text"
            placeholder="🔍  Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="services-filters">
          <div className="services-filters__inner">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <div className="services-grid__wrapper">
          {filtered.length === 0 ? (
            <div className="services-empty">
              <p>No services found. Try a different search!</p>
            </div>
          ) : (
            <div className="services-grid">
              {filtered.map((service) => (
                <div className="service-card" key={service.id}>
                  <div className="service-card__icon">{service.icon}</div>
                  <div className="service-card__body">
                    <span className="service-card__category">{service.category}</span>
                    <h3 className="service-card__name">{service.name}</h3>
                    <div className="service-card__meta">
                      <span>⏱ {service.time}</span>
                      <span>⭐ {service.rating}</span>
                    </div>
                  </div>
                  <div className="service-card__footer">
                    <span className="service-card__price">Starting {service.price}</span>
                    <button className="service-card__btn">Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;