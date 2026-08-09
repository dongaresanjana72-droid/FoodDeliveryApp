import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { categoriesList } from '../data/foodData';
import FoodCard from '../components/FoodCard';
import './Home.css';

export default function Home() {
  const { foodItems } = useContext(AppContext);
  const navigate = useNavigate();

const popularDishes = foodItems?.filter(item => item.popular)?.slice(0, 8) || [];
  return (
    <div className="home-page fade-in">
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">⚡ Lightning Fast Delivery</span>
            <h1>Delicious Food Delivered To Your Doorstep</h1>
            <p>Choose from over 50+ mouth-watering dishes crafted by top local chefs. Hot, fresh, and instantly delivered.</p>
            <div className="hero-btns">
              <Link to="/menu" className="btn btn-lg">Order Now</Link>
              <Link to="/categories" className="btn btn-outline btn-lg">Explore Categories</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202606/vg-300616884-16x9_0.png?VersionId=j.mFJGuIX68hqh6UNRCALGsAqJ0Baumr&size=690:388" alt="Delicious Feast" />
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header">
          <h2>Explore Categories</h2>
          <Link to="/categories" className="view-all">View All →</Link>
        </div>
        <div className="categories-grid">
          {categoriesList.slice(0, 8).map((cat, idx) => (
            <div 
              key={idx} 
              className="category-card"
              onClick={() => navigate(`/menu?category=${encodeURIComponent(cat)}`)}
            >
              <h3>{cat}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header">
          <h2>Popular Dishes</h2>
          <Link to="/menu" className="view-all">View Menu →</Link>
        </div>
        <div className="food-grid">
          {popularDishes.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}