import React from 'react'
import './Abouthead.css'
import Quetorhead from './Quetorhead';
import Header from './Header';
import AboutBanner from './assets/Aboutbanner.png'; // Make sure the path is correct

const Abouthead = () => {
  return (
    <>
      <Quetorhead />
      <section className="about-hero-sectionn">
      <div className="about-hero-overlay"></div>
      <img
    src={AboutBanner}
    alt="Background"
    className="about-background-img"
  />
        <div className="about-hero-contentt">
          <Header />
          <main className="about-main-content">
            <div className="about-contentt-container">
              <article className="about-text-column">
                <div className="about-headline-container">
                  <h1 className="about-headline">
                    <span className="about-headline-primary">Your Trusted</span>
                    <span className="about-headline-secondary">Question Papers</span>
                    <span className="about-headline-primary">Automator</span>
                  </h1>
                  <p className="about-description-text">
                    Revolutionize the way you create exams with lightning-fast automation, unbeatable accuracy, and zero stress.
                  </p>
                </div>
              </article>
            </div>
          </main>
        </div>
      </section>
    </>
  )
}

export default Abouthead;
