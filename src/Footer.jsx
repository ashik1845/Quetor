import React from 'react';
import './Footer.css';

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import logo from './assets/Footerlogoo.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
      <li onClick={() => navigate('/')}>Home</li>
      <li onClick={() => navigate('/about')}>About</li>
      <li onClick={() => navigate('/services')}>Services</li>
      <li onClick={() => navigate('/explore')}>Explore</li>
      <li onClick={() => navigate('/support')}>Support</li>
    </ul>
        </div>

        <div className="vertical-line" />

        {/* Center Logo and Info */}
        <div className="footer-section center">
          <img src={logo} alt="Quetor Logo" className="footer-logo" />
          <p>Reimagining Question Paper<br />Creation for the Modern Educator</p>
          <p className="sub-text">Schools | Colleges | Institutes</p>
        </div>

        <div className="vertical-line" />

        {/* Reach Us */}
        <div className="footer-section reach-us">
          <h4>Reach Us</h4>
          <ul>
          <li>
  <a href="tel:+917550254933">
    <FaPhoneAlt /> +91 75502 54933
  </a>
</li>
<li>
  <a href="mailto:mitbots01@gmail.com">
    <FaEnvelope /> Quetor@gmail.com
  </a>
</li>

<li>
  <a href="https://www.linkedin.com/company/mitbots-official/" target="_blank" rel="noopener noreferrer">
    <FaLinkedin /> LinkedIn
  </a>
</li>

            <li>
  <a href="https://wa.me/917550254933" target="_blank" rel="noopener noreferrer">
    <TbBrandWhatsappFilled />
  </a>
  <a href="https://www.instagram.com/mitbots_official" target="_blank" rel="noopener noreferrer">
    <AiFillInstagram />
  </a>
  </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p className="copyright">Copyright© 2025 Mitbots. All Rights Reserved.</p>
        <p className="terms">User Terms & Conditions | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
