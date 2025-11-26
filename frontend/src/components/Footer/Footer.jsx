import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-container">
        {/* Brand & Links */}
        <div className="footer-left">
          <img src="/fav-icon.png" alt="Logo" className="footer-logo" />
          <p className="footer-description">
            Your trusted bookstore for best books, latest releases, and trending reads.
          </p>
          <ul className="footer-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-right">
          <h3 className="newsletter-heading">Subscribe to Newsletter</h3>
          <p className="newsletter-text">Get updates on new books, offers, and events.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bookstore. All rights reserved.</p>
        <ul className="footer-links">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
