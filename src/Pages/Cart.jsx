import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Cart.css';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useContext(AppContext);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  const deliveryCharge = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const grandTotal = subtotal - discount + deliveryCharge;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'TASTY50') {
      setDiscount(50);
      alert('Coupon applied successfully! ₹50 off');
    } else {
      alert('Invalid Coupon Code. Try "TASTY50"');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center empty-cart">
        <h2>Your Cart is Empty</h2>
        <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/menu" className="btn btn-primary mt-3">Explore Menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-container container py-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      
      <div className="row">
        <div className="col-lg-8">
          {cart.map((item) => (
            <div className="cart-item-card mb-3 p-3 shadow-sm rounded d-flex align-items-center justify-content-between" key={item.id}>
              <div className="d-flex align-items-center gap-3">
                <img src={item.image} alt={item.name} className="cart-item-img rounded" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="text-danger fw-bold mb-2">₹{item.price}</p>
                  
                  <div className="d-flex align-items-center gap-2">
                    <button 
                      className="btn btn-sm btn-outline-secondary px-2"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="fw-bold px-2">{item.quantity}</span>
                    <button 
                      className="btn btn-sm btn-outline-secondary px-2"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <button 
                      className="btn btn-sm text-danger ms-3 text-decoration-underline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="cart-summary p-4 rounded shadow-sm">
            <h4 className="mb-3">Order Summary</h4>
            
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Coupon Code (e.g. TASTY50)" 
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="button" onClick={handleApplyCoupon}>Apply</button>
            </div>

            <div className="summary-row d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row d-flex justify-content-between mb-2 text-success">
                <span>Discount</span>
                <span>-{discount}</span>
              </div>
            )}
            <div className="summary-row d-flex justify-content-between mb-2">
              <span>GST (5%)</span>
              <span>₹{Math.round(subtotal * 0.05)}</span>
            </div>
            <div className="summary-row d-flex justify-content-between mb-2">
              <span>Delivery Charge</span>
              <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
            </div>
            <hr />
            <div className="summary-row total-row d-flex justify-content-between mb-4 fw-bold fs-5">
              <span>Grand Total</span>
              <span>₹{grandTotal + Math.round(subtotal * 0.05)}</span>
            </div>

            <button 
              className="btn btn-primary w-full mt-4"
              onClick={() => navigate('/checkout', { state: { grandTotal: grandTotal + Math.round(subtotal * 0.05) } })}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}