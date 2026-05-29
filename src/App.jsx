import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ServicemanDashboard from "./pages/ServicemanDashboard"; // ✅ keep only this

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/serviceman-dashboard" element={<ServicemanDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;