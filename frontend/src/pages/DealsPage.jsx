import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function DealsPage() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    api.products.getAll().then(data => {
      setDeals((data || []).filter(p => p.originalPrice > p.discountPrice));
    });
  }, []);

  return (
    <div>
      <div className="section-title">
        <span>Daily Deals & Discounts</span>
        <Link to="/" className="section-link">&larr; Back to Shop</Link>
      </div>

      <div className="products-grid">
        {deals.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
