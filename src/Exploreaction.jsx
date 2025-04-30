import React, { useEffect, useRef, useState } from 'react';
import './Exploreaction.css';
import exploreactionbox from './assets/exploreactionbox.png';
import exploreactionimage1 from './assets/Login.png';
import exploreactionimage2 from './assets/College_Dashboard.png';
import exploreactionimage3 from './assets/Login_History.png';
import exploreactionimage4 from './assets/Institute_Save.png';
import exploreactionyellow from './assets/exploreactionyellow.png';
import exploreactionsmall from './assets/exploreactionsmall.png';

const ExploreAction = () => {
  const sectionRef = useRef(null);
  const [internalScroll, setInternalScroll] = useState(0);
  const [isHijacking, setIsHijacking] = useState(false);
  const [scrollingLocked, setScrollingLocked] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [prevPhase, setPrevPhase] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const getResponsiveValues = (width) => {
    if (width <= 700) return { maxYellowMove: 120, maxSmallMove: 110, hijackScrollDistance: 1600 };
    if (width <= 1000) return { maxYellowMove: 140, maxSmallMove: 130, hijackScrollDistance: 2500 };
    if (width <= 1100) return { maxYellowMove: 180, maxSmallMove: 160, hijackScrollDistance: 2600 };
    if (width <= 1200) return { maxYellowMove: 200, maxSmallMove: 180, hijackScrollDistance: 2800 };
    return { maxYellowMove: 215, maxSmallMove: 200, hijackScrollDistance: 3200 };
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { maxYellowMove, maxSmallMove, hijackScrollDistance } = getResponsiveValues(screenWidth);

  const phases = [
    {
      image: exploreactionimage1,
      description: "Get started effortlessly with our secure and user-friendly login system built for convenience and control.",
      points: ["Secured Authentication", "Auto-login for returning users"],
      smallText: "Seamless Entry",
    },
    {
      image: exploreactionimage2,
      description: "A dynamic dashboard crafted for schools, colleges, and institutes — your central workspace for assessments.",
      points: ["Institution-specific interface", "Configurable parameters", "Direct access to create papers", "Streamlined navigation"],
      smallText: "Unified\nControl\u00A0Hub",
    },
    {
      image: exploreactionimage3,
      description: "Track login activity across your institution for transparency and accountability.",
      points: ["Time-stamped records", "Mode of login", "User tracking"],
      smallText: "Access Trail",
    },
    {
      image: exploreactionimage4,
      description: "Effortlessly generate secure and unpredictable question papers with precision and flexibility.",
      points: ["Built-in reliability", "Uncrackable algorithm-based", "Consistent and secure", "Save papers at desired location"],
      smallText: "Smart\u00A0Paper\nForge",
    },
  ];

  const checkContentFullyVisible = () => {
    const section = sectionRef.current;
    const content = section?.querySelector('.explore-action-content');
    if (!section || !content) return false;
    const rect = content.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = checkContentFullyVisible();
      setIsHijacking(isVisible);
      setScrollingLocked(isVisible);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isHijacking || !scrollingLocked) return;
      e.preventDefault();
      const delta = e.deltaY;
      setInternalScroll(prev => {
        let newScroll = Math.min(Math.max(prev + delta, 0), hijackScrollDistance);
        if (newScroll === 0 || newScroll === hijackScrollDistance) setScrollingLocked(false);
        if (!checkContentFullyVisible()) {
          setIsHijacking(false);
          setScrollingLocked(false);
        }
        return newScroll;
      });
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isHijacking, scrollingLocked]);

  useEffect(() => {
    let touchStartY = 0;
    let active = false;

    const handleTouchStart = (e) => {
      if (!isHijacking) return;
      touchStartY = e.touches[0].clientY;
      active = scrollingLocked;
    };

    const handleTouchMove = (e) => {
      if (!isHijacking || !active) return;
      const delta = touchStartY - e.touches[0].clientY;

      if (!checkContentFullyVisible()) {
        setIsHijacking(false);
        setScrollingLocked(false);
        active = false;
        return;
      }

      setInternalScroll(prev => {
        let newScroll = Math.min(Math.max(prev + delta, 0), hijackScrollDistance);
        const atTop = newScroll === 0;
        const atBottom = newScroll === hijackScrollDistance;

        if (atTop || atBottom) {
          setIsHijacking(false);
          setScrollingLocked(false);
          active = false;
          setTimeout(() => {
            const section = sectionRef.current;
            if (section) {
              window.scrollTo({
                top: atTop
                  ? section.offsetTop - section.offsetHeight
                  : section.offsetTop + section.offsetHeight + 10,
                behavior: 'smooth',
              });
            }
          }, 300);
        }

        touchStartY = e.touches[0].clientY;
        return newScroll;
      });

      if (active) e.preventDefault();
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isHijacking, scrollingLocked]);

  const internalProgress = internalScroll / hijackScrollDistance;

  useEffect(() => {
    let newPhase = 0;
    if (internalProgress < 0.3) newPhase = 0;
    else if (internalProgress < 0.6) newPhase = 1;
    else if (internalProgress < 0.9) newPhase = 2;
    else newPhase = 3;

    if (newPhase !== currentPhase) {
      setPrevPhase(currentPhase);
      setTransitioning(true);
      setTimeout(() => {
        setCurrentPhase(newPhase);
        setTransitioning(false);
      }, 400);
    }
  }, [internalProgress]);

  const yellowMove = internalProgress * maxYellowMove;
  const smallMove = internalProgress * maxSmallMove;

  return (
    <section ref={sectionRef} className="explore-action-section">
      <div style={{ position: 'sticky', top: 0, overflow: 'hidden' }}>
        <div className="explore-action-header">
          <h2 className="explore-action-title">
            See <span className="explore-action-highlight-quetor">Quetor</span> in Action
          </h2>
          <p className="explore-action-subtitle">
            Get a firsthand look at the intuitive interface of Quetor
          </p>
        </div>

        <div className="explore-action-content">
          <div className="explore-action-left">
            <div className={`explore-action-description-wrapper ${transitioning ? 'fade-out' : 'fade-in'}`}>
              <p className="explore-action-description">
                {phases[currentPhase].description}
              </p>
            </div>

            <div className={`explore-action-points ${transitioning ? 'fade-out' : 'fade-in'}`}>
              <div className="explore-action-points-wrapper">
                {phases[currentPhase].points.map((point, index) => (
                  <div className="explore-action-point" key={index}>
                    <span className="explore-action-types-services-tick">✓</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="explore-action-right">
            <div className="explore-action-image-wrapper">
              <img
                src={exploreactionyellow}
                alt="Explore Action Yellow"
                className="explore-action-yellow"
                style={{ transform: `translateY(${yellowMove}px)` }}
              />
              <img
                src={exploreactionbox}
                alt="Explore Action Box"
                className="explore-action-image"
              />
              <div className="scroll-image-container">
                <div
                  className="scroll-image-inner"
                  style={{ transform: `translateY(-${currentPhase * 25}%)` }}
                >
                  {phases.map((phase, i) => (
                    <img
                      key={i}
                      src={phase.image}
                      alt={`Explore Action Phase ${i + 1}`}
                      className="scroll-image"
                    />
                  ))}
                </div>
              </div>
              <div
                className="explore-action-small-wrapper"
                style={{ transform: `translateY(${smallMove}px)` }}
              >
                <img
                  src={exploreactionsmall}
                  alt="Explore Action Small"
                  className="explore-action-small"
                />
                <span className={`seamless-entry-text ${transitioning ? 'fade-out' : 'fade-in'}`}>
                  {phases[currentPhase].smallText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreAction;
