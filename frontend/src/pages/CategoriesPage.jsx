import React from 'react';
import { Link } from 'react-router-dom';
import { initialCategories } from '../data/mockProducts';

export default function CategoriesPage() {
  return (
    <div>
      <div className="section-title">
        <span>All Categories</span>
        <Link to="/" className="section-link">&larr; Back to Home</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {initialCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/?category=${encodeURIComponent(cat.name)}`}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'block'
            }}
          >
            <div style={{ height: '160px', overflow: 'hidden' }}>
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '15px' }}>
              <strong style={{ fontSize: '16px', display: 'block', color: '#0f172a' }}>{cat.name}</strong>
              <span style={{ fontSize: '13px', color: '#64748b' }}>Explore items &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
