import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    api.products.getAll({ keyword: searchTerm, category: selectedCategory })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory, searchTerm]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat) newParams.set('category', cat);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  return (
    <div>
      <HeroBanner />

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      <div style={{ marginTop: '30px' }}>
        <div className="section-title">
          <span>Popular Products</span>
          {selectedCategory && (
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Loading products...
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', background: '#ffffff', borderRadius: '12px' }}>
            <p>No products found for this search or category.</p>
            <button
              onClick={() => handleCategorySelect('')}
              className="hero-shop-btn"
              style={{ marginTop: '12px' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
