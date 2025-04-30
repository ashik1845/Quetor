import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import "./ScrollSection.css";
import Arrow from "./assets/arrowscroll.png";
import Step1 from "./assets/step1.png";
import Step2 from "./assets/step2.png";
import Step3 from "./assets/step3.png";

gsap.registerPlugin(ScrollTrigger);

const ScrollPage = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current;

    const scrollTween = gsap.to(sections, {
      xPercent: -65 * sections.length,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: "+=3000",
        markers: false,
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      {/* <section style={{ backgroundColor: "Yellow" }}>Welcome</section> */}

      <div className="scroll-steps-wrapper">
        <div className="scroll-steps-container scrollx" ref={containerRef}>
          <section className="scroll-steps-sec1 pin" ref={addToSectionsRef}>
            <div className="scroll-steps-contents">
              <img
                src={Step1}
                alt="Upload Source"
                className="scroll-step-illustration1"
              />
              <div className="scroll-step-data">
                <text className="scroll-step-number">01</text>
                <text className="scroll-step-heading">Upload Source</text>
                <text className="scroll-step-body">
                  Connect your question bank into the software
                </text>
              </div>
              <img src={Arrow} alt="Arrow" className="scroll-step-arrow" />
            </div>
          </section>
          <section className="scroll-steps-sec2 pin" ref={addToSectionsRef}>
            <div className="scroll-steps-contents">
              <img
                src={Step2}
                alt="Select Parameters"
                className="scroll-step-illustration2"
              />
              <div className="scroll-step-data">
                <text className="scroll-step-number">02</text>
                <text className="scroll-step-heading">Select Parameters</text>
                <text className="scroll-step-body">
                  Choose exam, subject, difficulty level, and pattern for your
                  question paper
                </text>
              </div>
              <img src={Arrow} alt="Arrow" className="scroll-step-arrow" />
            </div>
          </section>
          <section className="scroll-steps-sec3 pin" ref={addToSectionsRef}>
            <div className="scroll-steps-contents">
              <img
                src={Step3}
                alt="Generate & Save"
                className="scroll-step-illustration3"
              />
              <div className="scroll-step-data">
                <text className="scroll-step-number">03</text>
                <text className="scroll-step-heading">Generate & Save</text>
                <text className="scroll-step-body">
                  Create your question paper and save it in desired location as
                  word document
                </text>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ScrollPage;
