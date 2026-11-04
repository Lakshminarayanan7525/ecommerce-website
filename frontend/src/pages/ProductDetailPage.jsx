import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Zap, Check } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.products.getById(id)
      .then(data => {
        setProduct(data);
        setSelectedImg(data.image || (data.images && data.images[0]));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px' }}>Loading product details...</div>;
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2>Product not found</h2>
        <Link to="/" style={{ color: '#f59e0b', fontWeight: 'bold' }}>Back to Home</Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.discountPrice
    ? Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)
    : 0;

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleBuy = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  return (
    <div>
      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
        <Link to="/">Home</Link> &gt; <span>{product.categoryName}</span> &gt; <b>{product.name}</b>
      </div>

      <div className="product-detail-layout">
        <div className="detail-img-area">
          <div className="main-detail-img">
            <img src={selectedImg || product.image} alt={product.name} />
          </div>

          {gallery.length > 1 && (
            <div className="thumbnail-row">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`thumb-btn ${selectedImg === img ? 'active' : ''}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-content-area">
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>
            {product.categoryName}
          </span>
          <h1>{product.name}</h1>

          <div className="rating-badge">
            <Star size={16} fill="#f59e0b" color="#f59e0b" />
            <span>{product.rating || 4.5}</span>
            <span className="rating-count">({(product.reviewsCount || 8230).toLocaleString()} reviews)</span>
          </div>

          <div className="detail-price-box">
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>
              ₹{product.discountPrice?.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '16px', color: '#94a3b8', textDecoration: 'line-through' }}>
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="discount-badge" style={{ position: 'static' }}>
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
            {product.description}
          </p>

          <ul className="detail-features">
            {(product.features || [
              'High Definition Audio Clarity',
              'Up to 15 Hours Battery Backup',
              'Bluetooth Wireless 5.0 Support',
              'Comfortable Ergonomic Fit'
            ]).map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Quantity:</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="detail-actions-row">
            <button onClick={handleAdd} className="btn-yellow">
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
              <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
            </button>
            <button onClick={handleBuy} className="btn-dark">
              <Zap size={18} />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
