import React from 'react';
import './HomeQuote.css';
import quoteLeft from './assets/quoteleft.png';
import quoteRight from './assets/quote-right.png';
import star from '/assets/star.png';

const HomeQuote = () => {
  return (
    <div className="quote-banner">
      {/* Top Left */}
      <img src={star} alt="star" className="star star-left" />
      <img src={quoteLeft} alt="quote left" className="quote-left" />

      {/* Quote Text */}
      <p className="quote-text">
        Empower your education with seamless automation
      </p>

      {/* Bottom Right */}
      <img src={star} alt="star" className="star star-right" />
      <img src={quoteRight} alt="quote right" className="quote-right" />
    </div>
  );
};

export default HomeQuote;
