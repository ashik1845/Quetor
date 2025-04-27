import React from 'react'
import './Explorehead.css'
import Quetorhead from './Quetorhead';
import Header from './Header';
import ExploreBanner from './assets/ExploreBanner.png'; // Make sure the path is correct

const Explorehead = () => {
  return (
    <>
      <Quetorhead />
      <section className="explore-hero-sectionn">
        <div className="explore-hero-overlay"></div>
        <img
          src={ExploreBanner}
          alt="Background"
          className="explore-background-img"
        />
        <div className="explore-hero-contentt">
          <Header />
          <main className="explore-main-content">
            <div className="explore-contentt-container">
              <article className="explore-text-column">
                <div className="explore-headline-container">
                  <h1 className="explore-headline">
                    <span className="explore-headline-primary">Dive Deeper Into</span>
                    <span className="explore-headline-secondary">Quetor</span>
                  </h1>
                  <p className="explore-description-text">
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

export default Explorehead;
