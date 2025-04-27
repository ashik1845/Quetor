import React, { useEffect, useRef, useState } from "react";
import "./AboutkeyFeatures.css";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img5 from "./assets/img5.png";
import arrow from "./assets/arrow.png";
import lock from "./assets/lock.png";
import pipe from "./assets/pipe.png";
import message from "./assets/message.png";
import thumbsUp from "./assets/thumbsUp.png";
import lockEffect from "./assets/lockeffect.png";
import lockHandle from "./assets/lockhandle.png";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const featureData = [
  {
    img: img1,
    title: "Fast and Efficient",
    description:
      "No more waiting! Our software generates comprehensive question papers in seconds, so you can spend more time teaching and less time preparing assessments.",
    showCurve: true,
  },
  {
    img: img2,
    title: "User-Friendly Interface",
    description:
      "Navigating through Quetor is a breeze! Quetor's design is focused on ease of use, enabling educators to generate question papers quickly and efficiently, without technical complications.",
    loadingDots: true,
  },
  {
    img: img3,
    title: "Unpredictable and Secured",
    description:
      "Your reliability is our priority! Quetor uses advanced randomisation to generate secure, uncrackable question papers. Quetor operates locally without needing an internet connection, ensuring complete confidentiality and security.",
    showLockHandle: true,
  },
  {
    img: img4,
    title: "Customised Experience",
    description:
      "Create tailored question papers that meet specific curriculum needs. With Quetor, you can adjust difficulty levels and topics to align perfectly with your academic goals.",
  },
  {
    img: img5,
    title: "Comprehensive Support",
    description:
      "Our commitment to your success extends beyond software. Quetor offers comprehensive support, including tutorials and assistance, ensuring you make the most of our automation tools for your educational needs",
  },
];

const Aboutkeyfeatures = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const [isCurveVisible, setIsCurveVisible] = useState(false);
  const [lockVisible, setLockVisible] = useState(false);
  const [lockMove, setLockMove] = useState(false);
  const [showLockEffect, setShowLockEffect] = useState(false);
  const [pipeVisible, setPipeVisible] = useState(false);
  const [pipeMove, setPipeMove] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [thumbsUpFadeOut, setThumbsUpFadeOut] = useState(false);

  const lockRef = useRef(null);
  const pipeRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isIntersecting = entry.isIntersecting;

        if (!isIntersecting) {
          if (entry.target === lockRef.current) {
            setLockVisible(false);
            setLockMove(false);
            setShowLockEffect(false);
          }

          if (entry.target === pipeRef.current) {
            setPipeVisible(false);
            setPipeMove(false);
          }

          if (entry.target === messageRef.current) {
            setMessageVisible(false);
            setThumbsUpFadeOut(true);  // trigger fade-out animation
            setTimeout(() => {
              setShowThumbsUp(false);
              setThumbsUpFadeOut(false);
            }, 1000); // Ensure this timeout matches the fade-out animation duration
          }
        }

        if (entry.target === lockRef.current && isIntersecting) {
          setLockVisible(true);
        }

        if (entry.target === pipeRef.current && isIntersecting) {
          setPipeVisible(true);
        }

        if (entry.target === messageRef.current && isIntersecting) {
          setMessageVisible(true);
          setTimeout(() => {
            setShowThumbsUp(true); // Make sure thumbs-up shows when the message is visible
          }, 1300);
        }
      });
    }, { threshold: 1.0 });

    if (lockRef.current) observer.observe(lockRef.current);
    if (pipeRef.current) observer.observe(pipeRef.current);
    if (messageRef.current) observer.observe(messageRef.current);

    return () => observer.disconnect();
}, []);


  useEffect(() => {
    if (!lockVisible) return;
    const timer = setTimeout(() => {
      setLockMove(true);
      setTimeout(() => setShowLockEffect(true), 1100);
    }, 500);
    return () => clearTimeout(timer);
  }, [lockVisible]);

  useEffect(() => {
    if (!pipeVisible) return;
    const timer = setTimeout(() => {
      setPipeMove(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [pipeVisible]);

  useEffect(() => {
    if (!messageVisible) return;
    const timer = setTimeout(() => {
      setShowThumbsUp(true);
    }, 1300);
    return () => clearTimeout(timer);
  }, [messageVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsCurveVisible(entry.isIntersecting);
      });
    }, { threshold: 1.0 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="About-keyfeatures-container">
      <h1 className="About-keyfeatures-heading">
        <span className="About-keyfeatures-heading-key">Key</span> Features
      </h1>
      <p className="About-keyfeatures-subtext">
        Designed specially to address the real challenges of assessment creation
      </p>

      {featureData.map((feature, index) => {
        const showFillEffect = feature.showCurve && index === 0;

        return (
          <div
            className={`About-keyfeatures-feature ${
              index % 2 === 0
                ? "About-keyfeatures-img-left"
                : "About-keyfeatures-img-right"
            }`}
            key={index}
            data-aos="fade-up"
          >
            <div
              className={`About-keyfeatures-img-wrapper ${showFillEffect && isCurveVisible ? "fill-curve" : ""}`}
              ref={showFillEffect ? containerRef : null}
            >
              {index === 3 ? (
                <div className="img4-wrapper" ref={pipeRef}>
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="About-keyfeatures-img"
                  />
                  <div className="pipe-container">
                    <img
                      src={pipe}
                      alt="Pipe"
                      className={`pipe-img ${pipeMove ? "pipe-move" : ""}`}
                    />
                  </div>
                </div>
              ) : index === 4 ? (
                <div className="img5-wrapper" ref={messageRef}>
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="About-keyfeatures-img"
                  />
                  <img
                    src={message}
                    alt="Message"
                    className={`message-img ${messageVisible ? "animate-message" : "reset-message"}`}
                  />
                  {showThumbsUp && (
                    <img
                      src={thumbsUp}
                      alt="Thumbs Up"
                      className={`thumbs-up-img ${thumbsUpFadeOut ? "thumbs-up-fade-out" : "thumbs-up-fade-in"}`}
                    />
                  )}
                </div>
              ) : (
                <div ref={feature.showLockHandle ? lockRef : null}>
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="About-keyfeatures-img"
                  />
                  {feature.showLockHandle && (
                    <>
                      <img
                        src={lockHandle}
                        alt="Lock Handle"
                        className={`lock-handle-img ${lockMove ? "lock-animate" : ""}`}
                      />
                      <img src={lock} alt="Lock" className="lock-img" />
                      {showLockEffect && (
                        <img src={lockEffect} alt="Lock Effect" className="lock-effect-img" />
                      )}
                    </>
                  )}
                </div>
              )}

              {feature.showCurve && (
                <>
                  <svg
                    className="speedometer-curve"
                    viewBox="0 0 150 90"
                    xmlns="http://www.w3.org/2000/svg"
                    ref={containerRef}
                  >
                    <path
                      d="M10,80 A60,60 0 0,1 140,80"
                      fill="none"
                      stroke="#FFD5D5"
                      strokeWidth="20"
                      strokeLinecap="butt"
                    />
                    <path
                      d="M10,80 A60,60 0 0,1 140,80"
                      fill="none"
                      stroke="#FF5E5E"
                      strokeWidth="20"
                      strokeLinecap="butt"
                      className="curve-fill"
                    />
                  </svg>
                  <div className="arrow-container">
                    <img src={arrow} alt="Arrow" className="arrow-image" />
                  </div>
                </>
              )}

              {feature.loadingDots && (
                <div className="loading-dots">
                  <span className="dot dot1"></span>
                  <span className="dot dot2"></span>
                  <span className="dot dot3"></span>
                </div>
              )}
            </div>

            <div className="About-keyfeatures-text">
              <h2 className="About-keyfeatures-title">{feature.title}</h2>
              <p className="About-keyfeatures-description">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Aboutkeyfeatures;
