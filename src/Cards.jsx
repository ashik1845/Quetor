import React, { useState, useEffect } from 'react';
import './Cards.css';

const cardsData = [
  {
    id: 0,
    title: 'Free',
    features: ['Single User', 'Up to two devices', '1GB file storage', 'Local support'],
    price: 'Rs:100',
    color: '#f4f7f7',
  },
  {
    id: 1,
    title: 'Standard',
    features: ['3 Users', 'Unlimited Devices', '5GB Storage', 'Priority Support'],
    price: 'Rs:300',
    color: '#e6f0ff',
  },
  {
    id: 2,
    title: 'Premium',
    features: ['5 Users', 'Unlimited', '10GB Storage', 'Premium Support'],
    price: 'Rs:500',
    color: '#fff0f5',
  },
];

const Cardss = () => {
  const [activeIndex, setActiveIndex] = useState(1); // middle one is active by default
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [menuOpen, setMenuOpen] = useState(false);

  // Update state when resizing
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

      {/* Cards */}
      <div className="cards-container">
        {cardsData.map((card, index) => {
          const isActive = index === activeIndex;
          const zIndex = index === activeIndex ? 3 : index > activeIndex ? 2 : 1;
          const translateX = (index - activeIndex) * 80;

          return (
            <div
              key={card.id}
              className={`card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              style={{
                zIndex,
                transform: `translateX(${translateX}%) scale(${isActive ? 1.1 : 0.9})`,
                backgroundColor: card.color,
              }}
            >
              <h1>{card.title}</h1>
              <ul>
                {card.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <p className="price">{card.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cardss;
