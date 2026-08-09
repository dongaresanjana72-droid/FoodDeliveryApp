import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container page-container fade-in">
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p className="text-muted mb-4">Have questions about your order or our menu? Reach out to our 24/7 support team.</p>
          <p className="mb-2">📍 <strong>Address:</strong> Food Street, Civil Lines, Nagpur</p>
          <p className="mb-2">📞 <strong>Phone:</strong> +91 98765 43210</p>
          <p className="mb-2">✉️ <strong>Email:</strong> support@tastybites.com</p>
        </div>

        <div className="contact-form-box">
          {submitted ? (
            <div className="text-center py-5">
              <h3>Thank You!</h3>
              <p className="text-muted">We have received your message and will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" required placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="btn w-full">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}