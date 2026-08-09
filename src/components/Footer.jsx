import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h3>🍔 TastyBites</h3>
          <p>Delivering your favorite food hot & fresh right to your doorstep with lightning speed.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/orders">Order History</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe to get special offers and discounts.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button className="btn">Join</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 TastyBites Food Delivery App. All rights reserved.</p>
      </div>
    </footer>
  );
}