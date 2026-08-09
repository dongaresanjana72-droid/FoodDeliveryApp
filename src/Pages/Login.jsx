import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Mock user login
    const userData = { name: email.split('@')[0], email };
    setUser(userData);
    localStorage.setItem('foodApp_user', JSON.stringify(userData));
    alert('Login successful!');
    navigate('/');
  };

  return (
    <div className="auth-video-wrapper">
      {/* Background Video */}
     <video autoPlay loop muted playsInline className="auth-bg-video">
  <source src="https://assets.mixkit.co/videos/preview/mixkit-chef-cutting-vegetables-in-a-kitchen-43285-large.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
      <div className="auth-video-overlay"></div>

      {/* Login Card */}
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <p>Login to continue ordering delicious food</p>
        
        <form onSubmit={handleLogin} className="auth-form">
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
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>

        <p className="auth-switch-text mt-3 text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}