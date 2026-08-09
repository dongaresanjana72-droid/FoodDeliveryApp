import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'ORD-999999';

  return (
    <div className="container page-container text-center fade-in">
      <div className="success-card">
        <div className="success-icon">🎉</div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-id">Order Reference: <strong>{orderId}</strong></p>
        <p className="success-desc">Your delicious food is being prepared by our top chefs and will be delivered in approx 30 minutes.</p>
        
        <div className="success-btns">
          <Link to="/orders" className="btn">View My Orders</Link>
          <Link to="/menu" className="btn btn-outline">Order More</Link>
        </div>
      </div>
    </div>
  );
}