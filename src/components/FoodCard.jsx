import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './FoodCard.css';

export default function FoodCard({ item }) {
  const { addToCart, favourites, toggleFavourite } = useContext(AppContext);
const isFav = favourites?.includes(item.id);
  return (
    <div className="food-card fade-in">
      <div className="food-card-img-wrapper">
        <Link to={`/food/${item.id}`}>
          <img src={item.image} alt={item.name} />
        </Link>
        <span className={`badge ${item.veg ? 'badge-veg' : 'badge-nonveg'}`}>
          {item.veg ? 'VEG' : 'NON-VEG'}
        </span>
        {item.discount && <span className="badge badge-discount">{item.discount}</span>}
        <button 
          className={`fav-btn ${isFav ? 'active' : ''}`}
          onClick={() => toggleFavourite(item.id)}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="food-card-content">
        <div className="flex justify-between items-center mb-1">
          <span className="food-category">{item.category}</span>
          <span className="food-rating">⭐ {item.rating}</span>
        </div>

        <Link to={`/food/${item.id}`} className="food-title-link">
          <h3>{item.name}</h3>
        </Link>

        <p className="food-desc">{item.description}</p>

        <div className="food-card-footer mt-4">
          <span className="food-price">₹{item.price}</span>
          <button className="btn btn-sm" onClick={() => addToCart(item)}>
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}