import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme, user, cart, favourites, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          🍔 TastyBites
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <Link to="/cart" className="nav-icon-btn">
            🛒 {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu dropdown">
              <Link to="/profile" className="btn btn-sm btn-outline">
                👤 {user.name.split(' ')[0]}
              </Link>
              <button className="btn btn-sm" onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
              <Link to="/register" className="btn btn-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}