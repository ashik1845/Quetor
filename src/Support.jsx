import React, { useState } from "react";
import vector from "./assets/Vector.png";
import vector1 from "./assets/subtract.png";
import vector2 from "./assets/mail.png";
import vector3 from "./assets/chat.png";
import vector4 from "./assets/Subtracts.png";
import Supportheader from "./Supportheader"
import Footer from "./Footer"
import "./Support.css";

const Support = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const downloadGuide = (type) => {
    alert(`Downloading ${type} Guide...`);
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <Supportheader/>
    <div className="support-container">
      <h1>
        User <span>Resources</span>
      </h1>
      <p className="subtitle">
        Download comprehensive guides to maximise your Quetor experience.
      </p>

      <div className="row">
        <div className="card">
          <h2>College Guide</h2>
          <p>
            Step-by-step guide for <br />
            college faculty and admins to <br />
            set up, manage, and <br />
            generate assessments with <br />
            Quetor.
          </p>
          <button
            className="home-top-button"
            onClick={() => downloadGuide("College")}
          >
            Download
          </button>
        </div>

        <div className="card">
          <h2>School Guide</h2>
          <p>
            A complete walkthrough for <br />
            school educators to create <br />
            question papers and <br />
            manage class-level <br />
            assessments.
          </p>
          <button
            className="home-top-button"
            onClick={() => downloadGuide("School")}
          >
            Download
          </button>
        </div>
      </div>

      <div className="row">
        <div className="card">
          <h2>Institute Guide</h2>
          <p>
            Comprehensive instructions <br />
            for institutes to streamline <br />
            question paper creation for <br />
            any tests or competitive <br />
            examination.
          </p>

          <button
            className="home-top-button"
            onClick={() => downloadGuide("Institute")}
          >
            Download
          </button>
        </div>

        <div className="card">
          <h2>
            Bundle <br />
          </h2>
          <p>(Download All)</p>
          <button
            className="home-top-button"
            onClick={() => downloadGuide("Bundle")}
          >
            Download
          </button>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
          padding: "20px",
          margin: "0 auto",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <h1
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: "16px",
          }}
        >
          Need a <span style={{ color: "#F7B500" }}>Walkthrough?</span>
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#4d4d4d",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Our customer success team is available to provide personalised
          onboarding sessions for your team.
        </p>

        <button
          style={{
            background:
              "radial-gradient(circle, rgba(255, 217, 113, 1) 0%, rgba(186, 137, 4, 1) 100%)",
            borderRadius: "10px",
            padding: "10px 16px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            color: "#4d4d4d",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          Schedule A Session
        </button>
      </div>

      <div className="contact-wrapper">
        <div className="contact-section">
          <h1 className="contact-heading">
            Get In <span className="highlight">Touch</span>
          </h1>
          <p className="contact-subheading">
            Have a question or need assistance? Our support team is here to
            help.
          </p>

          <div className="contact-container">
            <div className="contact-left">
              <h2>Contact Information</h2>

              <div className="contact-item">
                <img src={vector} alt="Phone" className="icon" />
                <div>
                  <p className="contact-title">+91 75502 54933</p>
                  <p>Our team is available Monday to</p>
                  <p> Friday, 9am - 5pm.</p>
                </div>
              </div>

              <div className="contact-item">
                <img src={vector2} alt="Email" className="icon" />
                <div>
                  <p className="contact-title">
                    <a href="mailto:Quetor@gmail.com">Quetor@gmail.com</a>
                  </p>
                  <p>Send us an email and we'll get back</p>
                  <p>to you within 24 hours.</p>
                </div>
              </div>

              <div className="contact-item">
                <img src={vector3} alt="Chat" className="icon" />
                <div>
                  <p className="contact-title">Live Chat</p>
                  <p>Chat with our support team for</p>
                  <p> immediate assistance.</p>
                </div>
              </div>

              <button
                className="home-top-button"
                onClick={() =>
                  window.open("https://wa.me/917550254933", "_blank")
                }
              >
                Start Chat
              </button>
            </div>

            <div className="divider-line"></div>

            <div className="contact-right">
              <form
                id="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  document.getElementById("thank-you").style.display = "block";
                  e.target.reset();
                }}
              >
                <h2>Message Us</h2>

                <div className="form-group">
                  <input type="text" placeholder="Name" required />
                  <input type="text" placeholder="Institute Name" />
                </div>

                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                  <input type="tel" placeholder="Phone Number" />
                </div>

                <select required>
                  <option value="">Subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Sales">Sales</option>
                  <option value="Feedback">Feedback</option>
                </select>

                <textarea
                  placeholder="Write your message here"
                  rows="5"
                  required
                ></textarea>

                <div className="urgency">
                  <input type="checkbox" id="urgent" />
                  <label htmlFor="urgent">Urgency</label>
                </div>

                <button type="submit" className="home-top-button">
                  Submit
                </button>

                <div className="thank-you-message" id="thank-you">
                  Thank you for getting in touch! We'll respond shortly.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-container">
        <h1 className="faq-heading">
          Frequently Asked <span className="highlight">Questions</span>
        </h1>

        <div className="faq-box">
          {/* FAQ 1 */}
          <div
            className={`faq-item ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => toggleFAQ(0)}
          >
            <div className="faq-question">
              <p>What is Quetor and how does it work?</p>
              <img src={vector1} alt="Toggle Arrow" className="arrow" />
            </div>
            <div className="faq-answer">
              <p>
                Quetor is a question paper automation software that helps
                educational institutions create customized question papers
                quickly and efficiently. The system allows you to select
                parameters like subject, difficulty level, and question types,
                then generates papers from our extensive question bank or your
                own content.
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div
            className={`faq-item ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => toggleFAQ(1)}
          >
            <div className="faq-question">
              <p>Can I customize the format of the Question Papers?</p>
              <img src={vector4} alt="Toggle Arrow" className="arrow" />
            </div>
            <div className="faq-answer" style={{ textAlign: "center" }}>
              <p>Don't see your answer? Contact here!</p>
              <button className="home-top-button">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
      {/* End FAQ Section */}
    </div>
    <Footer/>
    </>
  );
};

export default Support;
