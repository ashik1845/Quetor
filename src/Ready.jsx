import React, { useEffect, useRef, useState } from 'react';
import './ready.css';
import star from './assets/star.png';

const Ready = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.4 } // Adjust threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="ready-container" ref={sectionRef}>
      <img src={star} alt="star" className="ready-star" />

      <div className={`ready-arc ready-top-arc ${inView ? 'ready-animate' : ''}`}></div>
      <div className={`ready-arc ready-mid-arc ${inView ? 'ready-animate' : ''}`}></div>

      <h1 className="ready-heading">
        Ready to transform your <span className="ready-highlight">question paper creation</span> process?
      </h1>
      <p className="ready-subtext">
        Join us to use Quetor to create perfect question papers in minutes.
      </p>
      <div className="ready-buttons">
        <button className="ready-button">Book A Demo</button>
        <button className="ready-button">Contact Us</button>
      </div>
    </div>
  );
};

export default Ready;
