import React, { useContext, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { categoriesList } from '../data/foodData';
import FoodCard from '../components/FoodCard';
import './Menu.css';

export default function Menu() {
  const { foodItems } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  const queryParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'All';

  const [search, setSearch] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [maxPrice, setMaxPrice] = useState(600);
  const [minRating, setMinRating] = useState(0);
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [bestSellerOnly, setBestSellerOnly] = useState(false);

  const filteredItems = useMemo(() => {
    return foodItems?.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                            item.category.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (item.price > maxPrice) return false;
      if (item.rating < minRating) return false;
      if (vegOnly && !item.veg) return false;
      if (nonVegOnly && item.veg) return false;
      if (fastDelivery && parseInt(item.deliveryTime) > 25) return false;
      if (popularOnly && !item.popular) return false;
      if (bestSellerOnly && !item.bestSeller) return false;
      return true;
    });
  }, [foodItems, search, selectedCategory, maxPrice, minRating, vegOnly, nonVegOnly, fastDelivery, popularOnly, bestSellerOnly]);

  return (
    <div className="container page-container fade-in">
      <h1 className="page-title">Explore Our Full Menu</h1>

      <div className="menu-layout">
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Search Food</label>
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Max Price: ₹{maxPrice}</label>
            <input 
              type="range" 
              min="50" 
              max="600" 
              step="50" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="filter-group">
            <label>Minimum Rating: {minRating} ⭐</label>
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.5" 
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            />
          </div>

          <div className="filter-checkboxes">
            <label><input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} /> Pure Veg</label>
            <label><input type="checkbox" checked={nonVegOnly} onChange={(e) => setNonVegOnly(e.target.checked)} /> Non-Veg</label>
            <label><input type="checkbox" checked={fastDelivery} onChange={(e) => setFastDelivery(e.target.checked)} /> Fast Delivery (&lt;25m)</label>
            <label><input type="checkbox" checked={popularOnly} onChange={(e) => setPopularOnly(e.target.checked)} /> Popular</label>
            <label><input type="checkbox" checked={bestSellerOnly} onChange={(e) => setBestSellerOnly(e.target.checked)} /> Best Seller</label>
          </div>
        </aside>

        <main className="menu-content">
<p className="results-count">Showing {filteredItems?.length || 0} delicious dishes</p>      
{filteredItems?.length === 0 ? (           
    <div className="no-results">
              <h3>No food items found matching your filters.</h3>
              <p>Try resetting filters or searching something else.</p>
            </div>
          ) : (
            <div className="food-grid">
{filteredItems?.map((item) => (
                  <FoodCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}