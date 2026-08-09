import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container page-container text-center fade-in">
      <div className="not-found-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p className="text-muted mb-4">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    </div>
  );
}