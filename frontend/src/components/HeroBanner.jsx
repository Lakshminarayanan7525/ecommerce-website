import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <div className="hero-banner">
      <div className="hero-text-area">
        <span className="hero-badge">Mega Electronics Fest</span>
        <h1 className="hero-title">
          Big Deals <br />
          <span>Bigger Savings!</span>
        </h1>
        <div className="hero-discount">Up to 70% OFF</div>
        <p className="hero-desc">
          Top deals on wireless headphones, smart gadgets, laptops, and fashion essentials.
        </p>
        <Link to="/deals" className="hero-shop-btn">
          Shop Now &rarr;
        </Link>
      </div>

      <div className="hero-img-box">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
          alt="Featured Headphones"
        />
      </div>
    </div>
  );
}
