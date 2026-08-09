import React from 'react';
import './About.css';

function About1() {
  return (
    <div className="container page-container fade-in">
      <h1 className="page-title">About TastyBites</h1>
      <div className="about-content">
        <p>Welcome to TastyBites, your number one source for all things food. We're dedicated to giving you the very best of culinary delights, with a focus on dependability, customer service, and lightning-fast delivery.</p>
        <p className="mt-4">Founded in 2026, TastyBites has come a long way from its beginnings. When we first started out, our passion for high-quality food delivery drove us to start our own platform so that users can enjoy restaurant-style meals right in the comfort of their homes.</p>
        <div className="about-features mt-6">
          <div className="feat-box">
            <h3>⚡ 30 Min Delivery</h3>
            <p>Our delivery partners ensure your food arrives piping hot.</p>
          </div>
          <div className="feat-box">
            <h3>🍲 50+ Dishes</h3>
            <p>From pizzas to biryanis and authentic desserts.</p>
          </div>
          <div className="feat-box">
            <h3>⭐ Top Rated</h3>
            <p>Partnered with the highest rated local restaurants.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About1;