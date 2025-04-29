import React, { useState } from 'react';
import './HomeHeader.css';// adjust path based on your file structure
import Header from './Header';
import Quetorhead from './Quetorhead';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const [frontCard, setFrontCard] = useState(1);
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    setFrontCard(index);
  };



  return (
    <section className="home-header-hero-section">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/738e36d80f757b29cdf8a1d75fc96f32729cf96f?placeholderIfAbsent=true&apiKey=bf7362d068e944f1b86d90c093e84367"
        className="home-header-hero-background"
        alt="Background image"
      />
      <Quetorhead/>
      <div className="home-header-hero-content">
        <Header/>
        <main className="home-header-main-content">
          <div className="home-header-content-container">
            <article className="home-header-text-column">
              <div className="home-header-headline-container">
                <h1 className="home-header-headline">
                  <span className="home-header-headline-primary">Automate</span>
                  <span className="home-header-headline-secondary">Question Papers</span>
                  <span className="home-header-headline-primary">Effortlessly</span>
                </h1>

                <div className="home-header-cta-container">
                <button
        className="home-header-cta-button home-header-primary-button"
        onClick={() => navigate('/about')}
      >
        <span>Get Started</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d45a03d1a544a04d8a4b6dad0e2f5d93f0c1168c?placeholderIfAbsent=true&apiKey=bf7362d068e944f1b86d90c093e84367"
          className="home-header-button-icon"
          alt="Arrow icon"
        />
      </button>

      <button
        className="home-header-cta-button home-header-secondary-button"
        onClick={() => navigate('/explore')}
      >
        Learn More
      </button>
                </div>

                <p className="home-header-description-text">
                  Quetor helps schools, colleges, and institutes create diverse
                  question papers in minutes, not hours
                </p>
              </div>
            </article>

            <div className="home-header-feature-cards-wrapper">
              <div className="home-header-feature-cards">
              {[0, 1, 2].map((index) => {
  const cardContents = [
    {
      icon: 'I',
      title: 'For Institutes',
      description:
        'Design specialized assessment papers for various training and certification programs.',
    },
    {
      icon: 'C',
      title: 'For Colleges',
      description:
        'Easily generate question sets tailored to your subject and syllabus with just a few clicks.',
    },
    {
      icon: 'S',
      title: 'For Schools',
      description:
        'Practice with randomized question sets to improve exam readiness and time management.',
    },
  ];

  const content = cardContents[index];

  return (
    <article
      key={index}
      className={`home-header-feature-card home-header-card-${index} ${frontCard === index ? 'active' : ''}`}
      onClick={() => handleCardClick(index)}
      style={{ zIndex: frontCard === index ? 3 : 1 }}
    >
      <div className="home-header-card-icon">{content.icon}</div>
      <div className="home-header-card-content">
        <h3 className="home-header-card-title">{content.title}</h3>
        <p className="home-header-card-description">
          {content.description}
        </p>
        <div className="home-header-card-link">
          <span>View</span>
          <div className="home-header-arrow-container">
            <svg
              width="20"
              height="16"
              viewBox="0 0 21 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="home-header-arrow-icon"
            >
              <path
                d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9H20V7H0L0 9Z"
                fill="#FFC000"
              />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
})}

              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default HomeHeader;
