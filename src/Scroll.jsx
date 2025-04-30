import React, { useState, useEffect, useRef } from "react";
import "./Scroll.css";
import ScrollPage from "./ScrollSection";
function Scroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isCarouselInView, setIsCarouselInView] = useState(false);
  const [hasPassedCarousel, setHasPassedCarousel] = useState(false);
  const [midSectionReached, setMidSectionReached] = useState(false);
  const [carouselCompleted, setCarouselCompleted] = useState(false);
  const [isCursorNearTitle, setIsCursorNearTitle] = useState(false);
  const [isCursorNearCarousel, setIsCursorNearCarousel] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState({
    toClientShowcase: false,
    toTop: false,
    toHowItWorks: false,
  });
  const [isAtFirstSlide, setIsAtFirstSlide] = useState(true);
  const [isNearCarousel, setIsNearCarousel] = useState(false);
  const [zoomedElements, setZoomedElements] = useState({
    welcomeText: false,
    howItWorks: false,
    subtitle: false,
    carousel: false,
    clientShowcase: false,
    clientTestimonial: false,
    clientLogos: false,
  });

  // Refs for DOM elements
  const bodyRef = useRef(document.body);
  const logoSecondaryRef = useRef(null);
  const welcomeTextRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const sectionSubtitleRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const indicatorDotsRef = useRef([]);
  const progressMessageRef = useRef(null);
  const currentStepRef = useRef(null);
  const clientShowcaseRef = useRef(null);
  const howItWorksRef = useRef(null);

  // Constants
  const wheelSensitivity = 0.0008;
  const touchSensitivity = 0.00012;

  // Variables for scroll handling
  let lastScrollTop = 0;
  let carouselScrollStart = 0;
  let isScrolling = false;
  let scrollTimeout;

  // Apply zoom-in effect to welcome text immediately
  useEffect(() => {
    setTimeout(() => {
      setZoomedElements((prev) => ({ ...prev, welcomeText: true }));
    }, 300);
  }, []);

  // Calculate the middle of the page
  const calculatePageMiddle = () => {
    return (
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) / 2
    );
  };

  // Function to check if element is in viewport
  const isInViewport = (element) => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return (
      (rect.top >= 0 && rect.top <= windowHeight * 0.8) ||
      (rect.bottom >= 0 && rect.bottom <= windowHeight) ||
      (rect.top <= 0 && rect.bottom >= windowHeight)
    );
  };

  // Function to check if we're near the carousel container
  const isNearCarouselContainer = () => {
    if (!carouselContainerRef.current) return false;

    const rect = carouselContainerRef.current.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return rect.top <= windowHeight * 1.4 && rect.top >= -windowHeight * 1.5;
  };

  // Function to check if cursor is near section title or subtitle
  const isCursorNearTitleArea = (event) => {
    if (!sectionTitleRef.current || !sectionSubtitleRef.current) return false;

    const titleRect = sectionTitleRef.current.getBoundingClientRect();
    const subtitleRect = sectionSubtitleRef.current.getBoundingClientRect();
    const cursorY = event.clientY;
    const cursorX = event.clientX;

    const expandedArea = 50; // pixels

    return (
      cursorX >= titleRect.left - expandedArea &&
      cursorX <= titleRect.right + expandedArea &&
      cursorY >= titleRect.top - expandedArea &&
      cursorY <= subtitleRect.bottom + expandedArea
    );
  };

  // Function to check if cursor is within 1cm of carousel
  const checkCursorProximity = (event) => {
    if (!carouselContainerRef.current) return false;

    const rect = carouselContainerRef.current.getBoundingClientRect();
    const cursorY = event.clientY;

    const cmInPixels = 38;

    const isAbove = cursorY >= rect.top - cmInPixels && cursorY < rect.top;
    const isBelow =
      cursorY <= rect.bottom + cmInPixels && cursorY > rect.bottom;
    const isWithin = cursorY >= rect.top && cursorY <= rect.bottom;

    return isAbove || isBelow || isWithin;
  };

  // Function to check if we've reached the mid-section of the page
  const hasMidSectionBeenReached = (scrollTop) => {
    const pageMiddle = calculatePageMiddle();
    return scrollTop >= pageMiddle * 0.4;
  };

  // Function to check if element is fully above the viewport
  const isAboveViewport = (element) => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return rect.bottom < 0;
  };

  // Function to smoothly scroll to an element
  const scrollToElement = (element, duration = 1000) => {
    if (!element) return;

    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // Scroll completed
        if (element === clientShowcaseRef.current) {
          setIsTransitioning((prev) => ({ ...prev, toClientShowcase: false }));
        } else if (element === howItWorksRef.current) {
          setIsTransitioning((prev) => ({ ...prev, toHowItWorks: false }));
        } else {
          setIsTransitioning((prev) => ({ ...prev, toTop: false }));
        }
      }
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animation);
  };

  // Function to update carousel position with precise control and smoother animation
  const updateCarouselPosition = (position) => {
    // Clamp position between 0 and 2
    position = Math.max(0, Math.min(2, position));

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
      if (carouselTrackRef.current) {
        // Update the transform with the exact position for inch-by-inch movement
        const translateX = position * 33.333;
        carouselTrackRef.current.style.transform = `translateX(-${translateX}%)`;
      }
    });

    // Update current position
    setCurrentPosition(position);

    // Track if we're at the first slide
    setIsAtFirstSlide(position < 0.1);

    // Update indicators based on the nearest integer position
    updateIndicators(Math.round(position));

    // Check if carousel is completed (reached the end)
    if (position >= 1.95 && !carouselCompleted) {
      setCarouselCompleted(true);

      // After a short delay, transition to client showcase
      setTimeout(() => {
        unlockScroll();

        // Only transition if not already transitioning
        if (!isTransitioning.toClientShowcase) {
          setIsTransitioning((prev) => ({ ...prev, toClientShowcase: true }));
          scrollToElement(clientShowcaseRef.current);
        }
      }, 500);
    } else if (position <= 0.05 && hasPassedCarousel) {
      // If we're at the beginning of the carousel and we've previously passed it
      setHasPassedCarousel(false);

      // After a short delay, transition to the "How it works" section
      setTimeout(() => {
        unlockScroll();

        // Only transition if not already transitioning
        if (!isTransitioning.toHowItWorks) {
          setIsTransitioning((prev) => ({ ...prev, toHowItWorks: true }));
          scrollToElement(howItWorksRef.current, 800);
        }
      }, 300);
    }
  };

  // Function to update indicators and current step
  const updateIndicators = (slideIndex) => {
    // Update the indicator dots (even though they're hidden)
    indicatorDotsRef.current.forEach((dot, index) => {
      if (index === slideIndex) {
        dot?.classList?.add("active");
      } else {
        dot?.classList?.remove("active");
      }
    });

    // Update the current step in the progress message
    if (currentStepRef.current) {
      currentStepRef.current.textContent = slideIndex + 1;
    }
  };

  // Function to lock scroll
  const lockScroll = () => {
    if (!isScrollLocked) {
      setIsScrollLocked(true);
      document.body.classList.add("scroll-lock");
      if (progressMessageRef.current) {
        progressMessageRef.current.classList.add("visible");
      }
    }
  };

  // Function to unlock scroll
  const unlockScroll = () => {
    if (isScrollLocked) {
      setIsScrollLocked(false);
      document.body.classList.remove("scroll-lock");
      if (progressMessageRef.current) {
        progressMessageRef.current.classList.remove("visible");
      }
    }
  };

  // Function to handle wheel events for inch-by-inch carousel movement
  const handleWheel = (event) => {
    // Only handle wheel events when cursor is near title area or carousel and carousel is in view
    if (!(isCursorNearTitle || isCursorNearCarousel) || !isCarouselInView)
      return;

    // Reset carousel completed flag when scrolling back up
    if (event.deltaY < 0 && carouselCompleted) {
      setCarouselCompleted(false);
    }

    // If already scrolling, don't process another event yet
    if (isScrolling) return;
    isScrolling = true;

    // Get the delta Y value (positive for scrolling down, negative for scrolling up)
    const deltaY = event.deltaY;

    // Calculate the new position with a sensitivity factor for smoother control
    const newPosition = currentPosition + deltaY * wheelSensitivity;

    // Update the carousel position
    updateCarouselPosition(newPosition);

    // Prevent default scrolling behavior when manipulating carousel
    event.preventDefault();

    // Add a small delay to prevent too many scroll events
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 10);
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Check if we're near the carousel container
      const nearCarousel = isNearCarouselContainer();
      setIsNearCarousel(nearCarousel);

      // Check if we've reached the mid-section of the page
      if (hasMidSectionBeenReached(scrollTop) && !midSectionReached) {
        setMidSectionReached(true);
        carouselScrollStart = scrollTop;
      }

      // Change border radius when scrolling
      if (scrollTop > 50) {
        setIsScrolled(true);
        document.body.classList.add("scrolled");

        // Move the logo more to the right when scrolling
        if (logoSecondaryRef.current) {
          logoSecondaryRef.current.classList.add("move-right");
          logoSecondaryRef.current.style.right =
            15 - Math.min(10, scrollTop / 10) + "px";
        }
      } else {
        setIsScrolled(false);
        document.body.classList.remove("scrolled");

        // Reset logo position
        if (logoSecondaryRef.current) {
          logoSecondaryRef.current.classList.remove("move-right");
          logoSecondaryRef.current.style.right = "15px";
        }
      }

      // Check if carousel is in view
      if (
        carouselContainerRef.current &&
        isInViewport(carouselContainerRef.current)
      ) {
        if (!isCarouselInView) {
          // Just entered view, record the scroll position
          setIsCarouselInView(true);

          // Only update start position if mid-section has been reached
          if (midSectionReached) {
            carouselScrollStart = scrollTop;

            // Lock scroll when carousel is in view, cursor is near title or carousel, and not completed
            if (
              !carouselCompleted &&
              (isCursorNearTitle || isCursorNearCarousel)
            ) {
              lockScroll();

              // Reset carousel position when scrolling back up
              if (scrollTop < lastScrollTop) {
                setCarouselCompleted(false);
                updateCarouselPosition(0);
              }
            }
          }
        }

        // Reset carousel completed flag when scrolling back up
        if (scrollTop < lastScrollTop && hasPassedCarousel) {
          setHasPassedCarousel(false);
          setCarouselCompleted(false);
        }

        // Mark as not passed yet
        setHasPassedCarousel(false);
      } else if (
        carouselContainerRef.current &&
        isAboveViewport(carouselContainerRef.current)
      ) {
        // Carousel is above viewport (we've scrolled past it)
        if (!hasPassedCarousel) {
          setHasPassedCarousel(true);

          // Ensure carousel is at the end position
          updateCarouselPosition(2);

          // Mark as completed
          setCarouselCompleted(true);

          // Unlock scroll if it's locked
          unlockScroll();
        }
        setIsCarouselInView(false);
      } else {
        // Carousel is below viewport (we haven't reached it yet)
        if (isCarouselInView) {
          setIsCarouselInView(false);

          // Unlock scroll if it's locked
          unlockScroll();
        }

        // Reset carousel position
        updateCarouselPosition(0);
      }

      // Apply zoom-in effect to elements when they come into view
      const zoomElements = document.querySelectorAll(".zoom-element");
      zoomElements.forEach((element) => {
        if (isInViewport(element) && !element.classList.contains("zoom-in")) {
          element.classList.add("zoom-in");
        }
      });

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    isCarouselInView,
    midSectionReached,
    hasPassedCarousel,
    carouselCompleted,
    isCursorNearTitle,
    isCursorNearCarousel,
    currentPosition,
    isScrollLocked,
    isTransitioning,
  ]);

  // Track mouse movement to detect proximity to section title and carousel
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if cursor is near section title or subtitle
      const nearTitle = isCursorNearTitleArea(e);
      setIsCursorNearTitle(nearTitle);

      // Check if cursor is near carousel
      const nearCarousel = checkCursorProximity(e);
      setIsCursorNearCarousel(nearCarousel);

      // If cursor is near title or carousel and carousel is in view, lock scroll
      if (
        (nearTitle || nearCarousel) &&
        isCarouselInView &&
        !carouselCompleted &&
        !isTransitioning.toClientShowcase &&
        !isTransitioning.toTop &&
        !isTransitioning.toHowItWorks
      ) {
        lockScroll();
      } else if (
        !(nearTitle || nearCarousel) &&
        isScrollLocked &&
        !isNearCarousel &&
        !isTransitioning.toClientShowcase &&
        !isTransitioning.toTop &&
        !isTransitioning.toHowItWorks
      ) {
        // If cursor moves away from title and carousel, unlock scroll
        unlockScroll();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [
    isCarouselInView,
    carouselCompleted,
    isScrollLocked,
    isNearCarousel,
    isTransitioning,
  ]);

  // Add wheel event listener for inch-by-inch carousel navigation
  useEffect(() => {
    const wheelHandler = (e) => {
      if (
        (isCursorNearTitle || isCursorNearCarousel) &&
        isCarouselInView &&
        !isTransitioning.toClientShowcase &&
        !isTransitioning.toTop &&
        !isTransitioning.toHowItWorks
      ) {
        // Reset carousel completed flag when scrolling back up
        if (e.deltaY < 0 && carouselCompleted) {
          setCarouselCompleted(false);
        }

        // Check if we're at the first slide and scrolling up
        if (isAtFirstSlide && e.deltaY < 0 && currentPosition <= 0.05) {
          // Transition to "How it works" section
          unlockScroll();
          if (!isTransitioning.towelcomeText) {
            setIsTransitioning((prev) => ({ ...prev, towelcomeText: true }));
            scrollToElement(welcomeTextRef.current, 1000);
            return;
          }
        }

        handleWheel(e);
      }
    };

    window.addEventListener("wheel", wheelHandler, { passive: false });
    return () => window.removeEventListener("wheel", wheelHandler);
  }, [
    isCursorNearTitle,
    isCursorNearCarousel,
    isCarouselInView,
    carouselCompleted,
    isAtFirstSlide,
    currentPosition,
    isTransitioning,
  ]);

  // Add touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchMoveY = 0;
    let isTouching = false;

    const handleTouchStart = (e) => {
      if (
        isNearCarousel &&
        !isTransitioning.toClientShowcase &&
        !isTransitioning.toTop &&
        !isTransitioning.toHowItWorks
      ) {
        touchStartY = e.touches[0].clientY;
        isTouching = true;

        // Check if touch is near carousel
        const touch = e.touches[0];
        const touchEvent = {
          clientY: touch.clientY,
          clientX: touch.clientX,
        };

        // Check if touch is near title or carousel
        const nearTitle = isCursorNearTitleArea(touchEvent);
        const nearCarousel = checkCursorProximity(touchEvent);

        setIsCursorNearTitle(nearTitle);
        setIsCursorNearCarousel(nearCarousel);

        // Reset carousel completed flag when scrolling back up
        if (hasPassedCarousel) {
          setHasPassedCarousel(false);
          setCarouselCompleted(false);
        }

        if (nearTitle || nearCarousel) {
          e.preventDefault();
          lockScroll();
        }
      }
    };

    const handleTouchMove = (e) => {
      if (
        isNearCarousel &&
        isTouching &&
        !isTransitioning.toClientShowcase &&
        !isTransitioning.toTop &&
        !isTransitioning.toHowItWorks
      ) {
        touchMoveY = e.touches[0].clientY;

        // Check if touch is near carousel
        const touch = e.touches[0];
        const touchEvent = {
          clientY: touch.clientY,
          clientX: touch.clientX,
        };

        // Check if touch is near title or carousel
        const nearTitle = isCursorNearTitleArea(touchEvent);
        const nearCarousel = checkCursorProximity(touchEvent);

        setIsCursorNearTitle(nearTitle);
        setIsCursorNearCarousel(nearCarousel);

        // Reset carousel completed flag when scrolling back up
        if (touchMoveY > touchStartY && carouselCompleted) {
          setCarouselCompleted(false);
        }

        // Check if we're at the first slide and scrolling up
        if (
          isAtFirstSlide &&
          touchMoveY > touchStartY &&
          currentPosition <= 0.05
        ) {
          // Transition to "How it works" section
          unlockScroll();
          if (!isTransitioning.towelcomeText) {
            setIsTransitioning((prev) => ({ ...prev, towelcomeText: true }));
            scrollToElement(welcomeTextRef.current, 800);
            return;
          }
        }

        if (nearTitle || nearCarousel) {
          const deltaY = touchStartY - touchMoveY;

          // Calculate new position with touch sensitivity
          const newPosition = currentPosition + deltaY * touchSensitivity;

          // Update carousel position
          updateCarouselPosition(newPosition);

          // Update touch start for continuous movement
          touchStartY = touchMoveY;

          e.preventDefault();
        }
      }
    };
    

    const handleTouchEnd = () => {
      isTouching = false;

      // If not near carousel anymore, unlock scroll
      if (
        !isNearCarousel &&
        !isTransitioning.toClientShowcase &&
        !isTransitioning.toTop &&
        !isTransitioning.toHowItWorks
      ) {
        unlockScroll();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isNearCarousel,
    currentPosition,
    hasPassedCarousel,
    carouselCompleted,
    isAtFirstSlide,
    isTransitioning,
  ]);

  // Initial check for elements in viewport and initialize carousel position
  useEffect(() => {
    setTimeout(() => {
      // Store indicator dots in ref
      indicatorDotsRef.current = Array.from(
        document.querySelectorAll(".indicator-dot")
      );

      // Initialize carousel position
      updateCarouselPosition(0);
    }, 100);
  }, []);

  return (
    <div className="home">
      <header className="top-header"></header>
      <main className="main-content">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/525bccdebad86c0927b1087554e0d97bd1bf7aa0?placeholderIfAbsent=true&apiKey=036f904d05094920a36fae75de93bcc4"
          className="logo"
          alt="Quetor Logo"
        />
        <section className="welcome-section">
          <p
            ref={welcomeTextRef}
            className={`welcome-text ${
              zoomedElements.welcomeText ? "zoom-in" : ""
            }`}
          >
            Welcome to Quetor, where innovation meets education. Our unique
            software simplifies the process of question paper creation,
            empowering educators to focus on what truly matters.
          </p>
          <img
            ref={logoSecondaryRef}
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/525bccdebad86c0927b1087554e0d97bd1bf7aa0?placeholderIfAbsent=true&apiKey=036f904d05094920a36fae75de93bcc4"
            className="logo-secondary"
            alt="Quetor Logo"
          />
        </section>
        <h2
          ref={howItWorksRef}
          className="section-title zoom-element"
          id="how-it-works"
        >
          <span className="title-bold">How it</span>
          <span className="title-highlight"> works</span>
        </h2>
        <p ref={sectionSubtitleRef} className="section-subtitle zoom-element">
          Unlock the Power of Quetor in 3 Easy Steps!
        </p>
      </main>

      <div><ScrollPage/></div>
      {/* Progress message */}

      <h2 ref={clientShowcaseRef} className="client-showcase zoom-element">
        Client
        <span className="title-highlight"> Showcase</span>
      </h2>
      <p className="client-testimonial zoom-element">
        <span className="client-name">KCG</span>
        is already experiencing the magic of Quetor with
        <br />
        overwhelmingly positive feedback. Join our satisfied clients today!
      </p>
      <footer className="client-logos zoom-element">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce492d461645ca10f8511106710d05b77fa5cb52?placeholderIfAbsent=true&apiKey=036f904d05094920a36fae75de93bcc4"
          className="client-logo-main"
          alt="Client Logo"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/15d682b81c61b864b6bdf1b8b47999cea7ed618a?placeholderIfAbsent=true&apiKey=036f904d05094920a36fae75de93bcc4"
          className="client-logo-small"
          alt="Small Logo"
        />
      </footer>
    </div>
  );
}

export default Scroll;
