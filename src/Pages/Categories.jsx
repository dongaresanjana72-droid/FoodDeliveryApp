import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { categoriesList } from '../data/foodData';
import './Categories.css';

export default function Categories() {
  const { foodItems } = useContext(AppContext);
  const navigate = useNavigate();

  // Sabhi categories ki proper food images mapping
  const categoryImages = {
    'Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
    'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    'Sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80',
    'Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
    'Chinese': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80',
    'South Indian': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80',
    'North Indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=80',
    'Rolls': 'https://vaya.in/recipes/wp-content/uploads/2017/11/Chicken-Spring-Rolls.jpeg?w=500&auto=format&fit=crop&q=80',
    'Pasta': 'https://www.chewoutloud.com/wp-content/uploads/2025/09/Chicken-Fajita-Pasta-in-Pan-Square.jpg?w=500&auto=format&fit=crop&q=80',
    'Drinks': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80',
    'Desserts': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=80',
    'Ice Cream': 'https://agronfoodprocessing.com/wp-content/uploads/2023/06/frozen-desserts.png?w=500&auto=format&fit=crop&q=80',
    'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&auto=format&fit=crop&q=80'
  };

  return (
    <div className="container page-container fade-in">
      <h1 className="page-title">Food Categories</h1>
      <p className="categories-subtitle">Pick your favorite cuisine and explore delicious dishes</p>

      <div className="categories-grid-page">
        {categoriesList.map((cat, idx) => {
const count = foodItems?.filter(item => item.category === cat)?.length || 0;
          const bgImg = categoryImages[cat] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80';

          return (
            <div 
              key={idx} 
              className="category-showcase-card"
              onClick={() => navigate(`/menu?category=${encodeURIComponent(cat)}`)}
            >
              <div className="category-img-container">
                <img src={bgImg} alt={cat} />
                <div className="category-overlay"></div>
              </div>
              <div className="category-details">
                <h3>{cat}</h3>
                <p>{count} Delicious items available</p>
                <span className="explore-link">Explore →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}