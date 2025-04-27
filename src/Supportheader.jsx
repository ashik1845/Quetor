import React from 'react'
import './Supportheader.css'
import Quetorhead from './Quetorhead';
import Header from './Header';
import SupportBanner from './assets/Supportbanner.png'; // Make sure the path is correct

const Supportheader = () => {
  return (
    <>
      <Quetorhead />
      <section className="support-hero-sectionn">
        <div className="support-hero-overlay"></div>
        <img
          src={SupportBanner}
          alt="Background"
          className="support-background-img"
        />
        <div className="support-hero-contentt">
          <Header />
          <main className="support-main-content">
            <div className="support-contentt-container">
              <article className="support-text-column">
                <div className="support-headline-container">
                  <h1 className="support-headline">
                    
                    <span className="support-headline-secondary">Support</span>
                    <span className="support-headline-primary">Center</span>
                  </h1>
                  <p className="support-description-text">
                  Resources, documentation, and help to get the most out of Quetor.
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

export default Supportheader;
