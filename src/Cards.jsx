import React, { useState, useEffect } from 'react';
import './Cards.css';

const cardsData = [
  {
    id: 1,
    content: "Emergency Info",
    bg: "#ff3b3f",
    color: "#fff",
    top: 0,
    left: 75,
  },
  {
    id: 2,
    content: "Rider Details",
    bg: "#000",
    color: "#fff",
    top: 120,
    left: 0,
  },
  {
    id: 3,
    content: "Helmet Status",
    bg: "#7f8c00",
    color: "#fff",
    top: 120,
    left: 150,
  },
];

const Cardss = () => {
  const [frontCard, setFrontCard] = useState(3);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (cardId) => {
    setFrontCard(cardId);
  };

  const getZIndex = (id) =>
    id === frontCard ? 3 : id === ((frontCard % 3) + 1) ? 2 : 1;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="main-nav">
        {!isMobile ? (
          <>
            <a href="#" className="nav-item nav-active">Home</a>
            <a href="#" className="nav-item">About</a>
            <a href="#" className="nav-item">Service</a>
            <a href="#" className="nav-item">Contact</a>
          </>
        ) : (
          <div className="mobile-nav">
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
            {menuOpen && (
              <div className="mobile-menu">
                <a href="#" className="nav-item">Home</a>
                <a href="#" className="nav-item">About</a>
                <a href="#" className="nav-item">Service</a>
                <a href="#" className="nav-item">Contact</a>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Content Section */}
      <div className="section">
        <div className="left-content">
          <h1>Smart Rider Safety</h1>
          <p>
            These cards provide crucial insights into the rider's safety and status. Click on each to bring it into focus and explore how we integrate emergency info, helmet detection, and rider details into one smart system.
          </p>
        </div>

        <div className="right-container">
          <div className="cards-container">
            {cardsData.map((card) => (
              <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`card ${card.id === frontCard ? "active" : ""}`}
              style={{
                zIndex: getZIndex(card.id),
                top: `${card.top}px`,
                left: `${card.left}px`,
                backgroundColor: card.bg,
                color: card.color,
              }}
            >
              <div className="label">{card.content}</div>
            </div>
            
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cardss;
