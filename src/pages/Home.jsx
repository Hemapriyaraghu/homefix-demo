import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TrustBar from "../components/TrustBar";
import Categories from "../components/Categories";
import StatsBar from "../components/StatsBar";
import HowItWorks from "../components/HowItWorks";
import TopMechanics from "../components/TopMechanics";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <Categories />
      <StatsBar />
      <HowItWorks />
      <TopMechanics />
      <Footer />
    </>
  );
};

export default Home;