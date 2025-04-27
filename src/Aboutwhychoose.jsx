import React, { useEffect, useRef, useState } from "react";
import "./Aboutwhychoose.css";
import aboutwhychoose1 from "./assets/Aboutwhychoose1.png";
import aboutwhychoose2 from "./assets/Aboutwhychoose2.png";
import aboutwhychoose3 from "./assets/Aboutwhychoose3.png";
import aboutwhychoose4 from "./assets/Aboutwhychoose4.png";
import aboutwhychoose5 from "./assets/Aboutwhychoose5.png";
import aboutwhychoose6 from "./assets/Aboutwhychoose6.png";
import bgCircle from "./assets/Ellipse.png";

const data = [
  {
    img: aboutwhychoose1,
    title: "Save Hours of Work",
    desc: "Reduce question paper creation time by up to 90%.",
  },
  {
    img: aboutwhychoose2,
    title: "Cost-Effective Solution",
    desc: "Save time and resources while enjoying superior quality.",
  },
  {
    img: aboutwhychoose3,
    title: "Reliable Performance",
    desc: "Count on us for consistent results every single time.",
  },
  {
    img: aboutwhychoose4,
    title: "Maintain Consistency",
    desc: "Ensure uniform formatting and style across all assessments throughout your institution.",
  },
  {
    img: aboutwhychoose5,
    title: "Customise to Your Needs",
    desc: "Adapt the system to your specific requirements, from simple quizzes to complex examinations",
  },
  {
    img: aboutwhychoose6,
    title: "Outstanding Customer Support",
    desc: "Our dedicated team is here to assist you whenever needed.",
  },
];

const Aboutwhychoose = () => {
  const cardRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          } else {
            setVisibleItems((prev) => prev.filter((item) => item !== index));
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="about-why-section">
      <h2 className="about-why-heading">
        Why Choose <span className="about-why-highlight">Quetor</span>
      </h2>
      <p className="about-why-subtext">
        Our platform delivers tangible benefits that transform how educational institutions approach assessments
      </p>

      <div className="about-why-grid">
        {data.map((item, index) => (
          <div
            className="about-why-card"
            key={index}
            data-index={index}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className="about-why-icon-wrapper">
              <img src={bgCircle} alt="background" className="about-why-bg" />
              <img
                src={item.img}
                alt={item.title}
                className={`about-why-img ${visibleItems.includes(index) ? "animate" : ""}`}
              />
            </div>
            <h3 className="about-why-card-title">{item.title}</h3>
            <p className="about-why-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Aboutwhychoose;
