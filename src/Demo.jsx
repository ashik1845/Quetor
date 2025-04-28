import React, { useEffect, useRef, useState } from "react";
import "./Demo.css";
import serviceImg1 from "./assets/service-img.png";
import serviceImg2 from "./assets/service-img2.png";
import serviceImg3 from "./assets/service-img3.png";
import donut from "./assets/donut.png";

const Demo = () => {
  const sectionRef = useRef(null);
  const donutRef = useRef(null);
  const [rotation, setRotation] = useState(135); // Ensure red side starts on the left
  const [donutTop, setDonutTop] = useState(200);
  const [scrollY, setScrollY] = useState(window.scrollY);
  
useEffect(() => {
  const handleScroll = () => {
    requestAnimationFrame(() => {
      const newScrollY = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      if (newScrollY < sectionTop) {
        setDonutTop(200);
        setRotation(135);
      } else if (newScrollY >= sectionTop && newScrollY <= sectionBottom) {
        setRotation(135 + (newScrollY - sectionTop) * 0.6); // Rotate smoothly
        setDonutTop(200 + (newScrollY - sectionTop) * 0.9); // Moves down further for full visibility
      } else {
        setDonutTop(sectionBottom + (newScrollY - sectionBottom) * 1.2); // Ensures no delay for last section
        setRotation(rotation + (newScrollY - sectionBottom) * 0.6); // Keep rotation aligned
      }

      setScrollY(newScrollY);
    });
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [rotation]);
  

  return (
    <div className="types-services-section" ref={sectionRef}>
      <h2 className="types-services-title">
        Types of <span className="types-services-highlight">Services</span>
      </h2>

      {/* Donut Circle: Smooth scrolling & rotation across devices */}
      <div
        ref={donutRef}
        className="donut-circle-container"
        style={{
          position: "absolute",
          top: `${donutTop}px`,
          left: "50%",
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          transition: "top 0.3s ease-out, transform 0.3s ease-out",
          opacity: 1,
        }}
      >
        <img src={donut} alt="Donut Circle" className="donut-circle" />
      </div>

      {[
        {
          img: serviceImg1,
          heading: "For Schools",
          description:
            "Comprehensive question paper solution for primary and secondary educational institutions.",
          features: [
            "Upload your own syllabus-aligned question bank",
            "Generate papers by selecting subjects, difficulty, and format",
            "Supports age-appropriate layouts and structures",
            "Multiple subject templates pre-configured.",
          ],
        },
        {
          img: serviceImg2,
          heading: "For Colleges",
          description:
            "Advanced assessment tools for higher education with specialized subject coverage.",
          features: [
            "Faculty-defined question bank uploads",
            "Auto-generates papers based on course, unit, and pattern",
            "Supports complex exam formats including theory and problem-solving",
            "Ensures consistency and accuracy across departments.",
          ],
        },
        {
          img: serviceImg3,
          heading: "For Institutes",
          description:
            "Custom solutions for specialized training centers, coaching institutes, and certification bodies.",
          features: [
            "Accepts institute-specific question inputs",
            "Predefined templates for various competitive examinations",
            "Practice test generation for certifications",
            "Automates bulk paper generation based on chosen parameters.",
          ],
        },
      ].map((service, index) => (
        <div key={index} id={`for-${service.heading.toLowerCase().split(" ")[1]}`}>
          <div className={`types-services-content ${service.heading === "For Colleges" ? "reverse" : ""}`}>
            <img src={service.img} alt="Service" className="types-services-service-img" />
            <div className="types-services-content-box">
              <h3 className="types-services-service-heading">{service.heading}</h3>
              <p className="types-services-service-description">{service.description}</p>
              <h4 className="types-services-feature-title">Key Features</h4>
              <ul className="types-services-feature-list">
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <span className="types-services-tick">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Demo;
