import React from 'react';
import './Servicehead.css';
import Quetorhead from './Quetorhead';
import Header from './Header';
import Servicebanner from './assets/Girll.png'; // Make sure the path is correct

const Servicehead = () => {
  return (
    <>
      <Quetorhead />
      <section className="service-about-hero-sectionn">
        {/* Overlay div to make background opaque */}
        <div className="service-about-hero-overlay"></div>

        {/* Background image with no transparency */}
        <div className="service-about-background-container">
          <img
            src={Servicebanner}
            alt="Background"
            className="service-about-background-img"
          />
        </div>

        {/* Content section above the background */}
        <div className="service-about-hero-contentt">
          <Header />
          <main className="service-about-main-content">
            <div className="service-about-contentt-container">
              <article className="service-about-text-column">
                <div className="service-about-headline-container">
                  <h1 className="service-about-headline">
                    <span className="service-about-headline-primary">Automate</span>
                    <span className="service-about-headline-secondary">Question Papers</span>
                    <span className="service-about-headline-primary">for educational excellence</span>
                  </h1>
                  <p className="service-about-description-text">
                    Redefining Education with Unstoppable Question Paper<br />
                    Automation for Unmatched Academic Excellence!
                  </p>
                </div>
              </article>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default Servicehead;
