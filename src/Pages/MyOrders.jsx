import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './MyOrders.css';

export default function MyOrders() {
  const { orders } = useContext(AppContext);

  if (orders.length === 0) {
    return (
      <div className="container page-container text-center fade-in">
        <h2>No Order History Found</h2>
        <p className="mt-2 mb-4">You haven't placed any food orders yet.</p>
        <Link to="/menu" className="btn">Explore Menu</Link>
      </div>
    );
  }

  return (
    <div className="container page-container fade-in">
      <h1 className="page-title">My Order History</h1>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>{order.id}</h3>
                <p className="order-date">{order.date}</p>
              </div>
              <span className="badge badge-veg">Delivered / On the way</span>
            </div>

            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-row">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <span>Total Paid: <strong>₹{order.grandTotal}</strong></span>
              <span>Payment: {order.shippingData?.paymentMethod || 'Online'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}