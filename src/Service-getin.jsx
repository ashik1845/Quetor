import React from 'react';
import './Service-getin.css';
import contactImg from './assets/getintouch-img.png';
import phoneIcon from './assets/phone-icon.png';
import emailIcon from './assets/email-icon.png';
import chatIcon from './assets/chat-icon.png';

const ServiceGetIn = () => {
  return (
    <section className="getin-section">
      <h2 className="getin-title">
        Get In <span className="highlight">Touch</span>
      </h2>
      <p className="getin-description">
        We're here to answer your questions and help you find the right solution for your institution
      </p>

      <div className="getin-container">
        <div className="getin-image">
          <img src={contactImg} alt="Get in touch illustration" />
        </div>

        <div className="getin-content">
          <div className="contact-block">
            <div className="contact-icon">
              <img src={phoneIcon} alt="Phone Icon" />
            </div>
            <div className="contact-text">
              <h4 className="contact-title">+91 75502 54933</h4>
              <p className="contact-description">
              Our team is available Monday to Friday, 9am - 5pm.
              </p>
            </div>
          </div>

          <div className="contact-block">
            <div className="contact-icon">
              <img src={emailIcon} alt="Email Icon" />
            </div>
            <div className="contact-text">
              <h4 className="contact-title">Quetor@gmail.com</h4>
              <p className="contact-description">
                Send us an email and we'll get back to you within 24 hours.
              </p>
            </div>
          </div>

          <div className="contact-block">
            <div className="contact-icon">
              <img src={chatIcon} alt="Chat Icon" />
            </div>
            <div className="contact-text">
              <h4 className="contact-title">Live Chat</h4>
              <p className="contact-description">
                Chat with our support team for immediate assistance.
              </p>
            </div>
          </div>

          <button className="chat-button">Start Chat</button>
        </div>
      </div>
    </section>
  );
};

export default ServiceGetIn;
