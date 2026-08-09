import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './FoodDetails.css';

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { foodItems, addToCart } = useContext(AppContext);
  const [qty, setQty] = useState(1);

  const item = foodItems.find(f => String(f.id) === String(id)) || foodItems[0];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(item);
    }
    navigate('/cart');
  };

  return (
    <div className="container food-detail-page fade-in">
      <button className="back-nav-btn" onClick={() => navigate(-1)}>
        ← Back to Menu
      </button>

      <div className="food-detail-card">
        <div className="food-detail-image-wrapper">
          <img src={item.image} alt={item.name} />
          <span className={`food-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>
            {item.isVeg ? '🟢 Pure Veg' : '🔴 Non-Veg'}
          </span>
          <span className="discount-badge-tag">🔥 10% OFF</span>
        </div>

        <div className="food-detail-content">
          <div className="food-category-tag">{item.category}</div>
          <h1 className="food-main-title">{item.name}</h1>

          <div className="price-rating-bar">
            <div className="price-box-group">
              <span className="main-price">₹{item.price}</span>
              <span className="original-price">₹{Math.round(item.price * 1.15)}</span>
            </div>
            <span className="rating-badge">⭐ {item.rating} / 5.0</span>
          </div>

          <p className="food-description-text">{item.description}</p>

          <div className="delivery-perk-box">
            <div className="perk-item">
              <span>⏱️ Delivery Time</span>
              <strong>20-25 mins</strong>
            </div>
            <div className="perk-item">
              <span>🛡️ Status</span>
              <strong className="text-success">🟢 In Stock & Ready</strong>
            </div>
          </div>

          <div className="order-action-section">
            <div className="quantity-box-wrapper">
              <span>Select Quantity</span>
              <div className="qty-stepper">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>

            <button className="btn-primary-glow" onClick={handleAddToCart}>
              Add {qty} item{qty > 1 ? 's' : ''} to Cart • ₹{item.price * qty}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}