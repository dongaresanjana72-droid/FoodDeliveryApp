import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Profile.css';

export default function Profile() {
  const { user, updateProfile, orders } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="container page-container fade-in">
      <h1 className="page-title">My Profile</h1>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-avatar">👤</div>
          <h2>{user?.name}</h2>
          <p className="text-muted">{user?.email}</p>

          {!isEditing ? (
            <div className="profile-info-box mt-4">
              <p><strong>Mobile:</strong> {user?.mobile || 'Not added'}</p>
              <p><strong>Address:</strong> {user?.address || 'Not added'}</p>
              <button className="btn btn-outline w-full mt-4" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          ) : (
            <form className="mt-4" onSubmit={handleSave}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn w-full">Save Changes</button>
            </form>
          )}
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <h3>{orders.length}</h3>
            <p>Total Orders Placed</p>
          </div>
          <div className="stat-card">
            <h3>₹{orders.reduce((acc, o) => acc + o.grandTotal, 0)}</h3>
            <p>Total Lifetime Spent</p>
          </div>
        </div>
      </div>
    </div>
  );
}