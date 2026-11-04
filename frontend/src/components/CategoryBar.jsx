import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Shirt, Home, Layers } from 'lucide-react';

const categories = [
  { name: 'All', icon: Layers },
  { name: 'Electronics', icon: Tv },
  { name: 'Fashion', icon: Shirt },
  { name: 'Home & Kitchen', icon: Home },
];

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <div>
      <div className="section-title">
        <span>Shop by Category</span>
        <Link to="/categories" className="section-link">View All &rarr;</Link>
      </div>

      <div className="category-row">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = (selectedCategory || 'All').toLowerCase() === cat.name.toLowerCase();

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name === 'All' ? '' : cat.name)}
              className={`category-card-btn ${isSelected ? 'active' : ''}`}
            >
              <div className="category-icon-box">
                <Icon size={22} />
              </div>
              <span className="category-card-name">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
