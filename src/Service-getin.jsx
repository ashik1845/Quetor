import React from 'react';
import './Service-getin.css';
import contactImg from './assets/getintouch-img.png';
import phoneIcon from './assets/phone-icon.png';
import emailIcon from './assets/email-icon.png';
import chatIcon from './assets/chat-icon.png';

const ServiceGetIn = () => {
  return (
    <section className="getoutgetin-section">
      <h2 className="getoutgetin-title">
        Get In <span className="getouthighlight">Touch</span>
      </h2>
      <p className="getoutgetin-description">
        We're here to answer your questions and help you find the right solution for your institution
      </p>

      <div className="getoutgetin-container">
        <div className="getoutgetin-image">
          <img src={contactImg} alt="Get in touch illustration" />
        </div>

        <div className="getoutgetin-content">
          <div className="getoutcontact-block">
            <div className="getoutcontact-icon">
              <img src={phoneIcon} alt="Phone Icon" />
            </div>
            <div className="getoutcontact-text">
              <h4 className="getoutcontact-title">+91 75502 54933</h4>
              <p className="getoutcontact-description">
              Our team is available Monday to Friday, 9am - 5pm.
              </p>
            </div>
          </div>

          <div className="getoutcontact-block">
            <div className="getoutcontact-icon">
              <img src={emailIcon} alt="Email Icon" />
            </div>
            <div className="getoutcontact-text">
              <h4 className="getoutcontact-title">Quetor@gmail.com</h4>
              <p className="getoutcontact-description">
                Send us an email and we'll get back to you within 24 hours.
              </p>
            </div>
          </div>

          <div className="getoutcontact-block">
            <div className="getoutcontact-icon">
              <img src={chatIcon} alt="Chat Icon" />
            </div>
            <div className="getoutcontact-text">
              <h4 className="getoutcontact-title">Live Chat</h4>
              <p className="getoutcontact-description">
                Chat with our support team for immediate assistance.
              </p>
            </div>
          </div>

          <button
  className="getoutchat-button"
  onClick={() => window.open('https://wa.me/917550254933', '_blank')}
>
  Start Chat
</button>

        </div>
      </div>
    </section>
  );
};

export default ServiceGetIn;
