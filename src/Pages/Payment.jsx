import React,{ useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Payment.css';

export default function Payment() {
  const { addOrder } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const shippingData = location.state?.shippingData || {};
  const grandTotal = location.state?.grandTotal || 0;

  const [loading, setLoading] = useState(false);

  const handleSimulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newOrder = addOrder({
        shippingData,
        grandTotal,
        paymentStatus: 'Paid Successfully'
      });
      navigate('/order-success', { state: { orderId: newOrder.id } });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="container page-container text-center payment-loading fade-in">
        <div className="spinner"></div>
        <h2>Processing Secure Payment...</h2>
        <p>Please do not refresh or press back.</p>
      </div>
    );
  }

  return (
    <div className="container page-container fade-in">
      <div className="payment-gateway-card">
        <h2>Secure Payment Gateway</h2>
        <p className="mb-4">Payment Method: <strong>{shippingData.paymentMethod || 'Online'}</strong></p>
        <h1 className="price mb-4">₹{grandTotal}</h1>

        {shippingData.paymentMethod === 'UPI' && (
          <div className="payment-box">
            <p>Enter UPI ID (e.g. user@oksbi)</p>
            <input type="text" placeholder="username@bank" defaultValue="tastybites@upi" />
          </div>
        )}

        {shippingData.paymentMethod?.includes('Card') && (
          <div className="payment-box">
            <input type="text" placeholder="Card Number (4242 4242 ...)" defaultValue="4242 4242 4242 4242" />
            <div className="form-row mt-3">
              <input type="text" placeholder="MM/YY" defaultValue="12/28" />
              <input type="password" placeholder="CVV" defaultValue="388" />
            </div>
          </div>
        )}

        {shippingData.paymentMethod === 'Cash on Delivery' && (
          <div className="payment-box">
            <p>You selected Cash on Delivery. Keep exact cash ready upon delivery.</p>
          </div>
        )}

        <button className="btn btn-lg w-full mt-4" onClick={handleSimulatePayment}>
          Confirm & Pay ₹{grandTotal}
        </button>
      </div>
    </div>
  );
}