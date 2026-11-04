import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onSearch }) {
  const { totalCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand-logo">
          <div className="logo-icon-box">
            <ShoppingBag size={22} />
          </div>
          <div>Apex<span>Store</span></div>
        </Link>

        <form onSubmit={handleSearch} className="nav-search-form">
          <input
            type="text"
            className="nav-search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="nav-search-btn">
            <Search size={16} />
          </button>
        </form>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
          <Link to="/deals" className="nav-link">Deals</Link>
          <Link to="/orders" className="nav-link">Orders</Link>
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon-btn" title="Cart">
            <ShoppingCart size={22} />
            {totalCount > 0 && <span className="cart-badge-count">{totalCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/profile" className="user-btn">
                <User size={16} />
                <span>{user?.name?.split(' ')[0] || 'Profile'}</span>
              </Link>
              <button onClick={logout} className="delete-btn" title="Logout" style={{ color: '#64748b' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="user-btn">
              <User size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
