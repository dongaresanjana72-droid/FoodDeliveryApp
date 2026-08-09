import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="auth-video-wrapper">
      {/* Background HD Food Video */}
      <video autoPlay loop muted playsInline className="auth-bg-video">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-chef-cutting-vegetables-in-a-kitchen-43285-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="auth-video-overlay"></div>

      {/* Registration Card */}
      <div className="auth-container">
        <h2>Create Account</h2>
        <p>Register to start ordering delicious food</p>
        
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Create a password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>

        <p className="auth-switch-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}