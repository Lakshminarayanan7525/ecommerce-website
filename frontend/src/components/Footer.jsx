import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', marginBottom: '10px' }}>
            <ShoppingBag size={20} color="#f59e0b" />
            <strong style={{ fontSize: '18px' }}>ApexStore</strong>
          </div>
          <p style={{ lineHeight: '1.6', maxWidth: '300px' }}>
            Shop authentic electronics, smart wearables, audio devices, and fashion items at the best prices.
          </p>
        </div>

        <div>
          <h5>Quick Links</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/deals">Daily Deals</Link>
            <Link to="/orders">My Orders</Link>
          </div>
        </div>

        <div>
          <h5>Customer Service</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile & Address</Link>
            <Link to="/login">Account Login</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ApexStore. All rights reserved.
      </div>
    </footer>
  );
}
