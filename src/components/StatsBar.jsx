import { useEffect, useRef, useState } from "react";
import "./StatsBar.css";

const stats = [
  { value: 50000, suffix: "+", label: "Happy Customers" },
  { value: 1200, suffix: "+", label: "Expert Technicians" },
  { value: 25, suffix: "+", label: "Service Categories" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

const useCountUp = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
};

const StatItem = ({ value, suffix, label, animate }) => {
  const count = useCountUp(value, 1800, animate);
  return (
    <div className="stats-bar__item">
      <span className="stats-bar__value">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="stats-bar__label">{label}</span>
    </div>
  );
};

const StatsBar = () => {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-bar" ref={ref}>
      <div className="stats-bar__inner">
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} animate={animate} />
        ))}
      </div>
    </section>
  );
};

export default StatsBar;