import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Checkout.css';

export default function Checkout() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const grandTotal = location.state?.grandTotal || 0;

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    mobile: user?.mobile || '',
    email: user?.email || '',
    address: user?.address || '',
    city: 'Nagpur',
    state: 'Maharashtra',
    pincode: '440001',
    paymentMethod: 'UPI'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { shippingData: formData, grandTotal } });
  };

  return (
    <div className="container page-container fade-in">
      <h1 className="page-title">Checkout & Delivery Details</h1>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Shipping Address</h3>
          
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <textarea name="address" rows="3" required value={formData.address} onChange={handleChange}></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" required value={formData.city} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" required value={formData.state} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Payment Method</h3>
          <div className="payment-options">
            {['UPI', 'Credit Card', 'Debit Card', 'Cash on Delivery'].map((method) => (
              <label key={method} className={`payment-option ${formData.paymentMethod === method ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value={method} 
                  checked={formData.paymentMethod === method}
                  onChange={handleChange}
                />
                {method}
              </label>
            ))}
          </div>

          <button type="submit" className="btn btn-lg w-full mt-4">
            Proceed to Pay ₹{grandTotal}
          </button>
        </div>
      </form>
    </div>
  );
}