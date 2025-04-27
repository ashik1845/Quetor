import React from 'react';
import './Footer.css';

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { BiSolidMessageRounded } from "react-icons/bi";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { AiFillInstagram } from "react-icons/ai";
import logo from './assets/Logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Explore</li>
            <li>Support</li>
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
            <li><FaPhoneAlt /> +91 75502 54933</li>
            <li><FaEnvelope /> Quetor@gmail.com</li>
            <li><BiSolidMessageRounded /> Live Chat</li>
            <li><TbBrandWhatsappFilled /> <AiFillInstagram /></li>
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
