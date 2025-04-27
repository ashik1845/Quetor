import React from 'react';
import './Exploredemo.css';

const Exploredemo = () => {
  return (
    <section className="explore-demo-section">
      <div className="explore-demo-container">
        <h2 className="explore-demo-headline">
          Book A <span className="highlight-demo">Demo</span>
        </h2>
        <p className="explore-demo-description">
          Explore how Quetor transforms the question paper creation process through our interactive demo and comprehensive feature tour.
        </p>
        <div className="explore-demo-button-container">
          <button className="explore-demo-button">Book A Demo</button>
        </div>
      </div>
    </section>
  );
};

export default Exploredemo;
