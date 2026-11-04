import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);

  const isAlreadyInCart = items.some(item => (item.product._id || item.product) === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const discountPercent = product.originalPrice && product.discountPrice
    ? Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <div className="product-img-box">
          <img src={product.image} alt={product.name} />
          {discountPercent > 0 && (
            <span className="discount-badge">{discountPercent}% OFF</span>
          )}
        </div>

        <div className="product-info-title">{product.name}</div>

        <div className="rating-badge">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>{product.rating || 4.5}</span>
          <span className="rating-count">({product.reviewsCount || 1200})</span>
        </div>
      </Link>

      <div className="product-card-bottom">
        <div className="price-row">
          <span className="current-price">₹{product.discountPrice?.toLocaleString('en-IN')}</span>
          {product.originalPrice && product.originalPrice > product.discountPrice && (
            <span className="original-price">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={`add-btn ${added || isAlreadyInCart ? 'added' : ''}`}
          title="Add to Cart"
        >
          {added ? <Check size={16} /> : <ShoppingCart size={16} />}
        </button>
      </div>
    </div>
  );
}
