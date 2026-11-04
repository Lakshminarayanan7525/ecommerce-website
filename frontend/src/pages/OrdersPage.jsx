import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.orders.getMyOrders()
      .then(data => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'All') return true;
    return (order.orderStatus || 'Delivered').toLowerCase() === filter.toLowerCase();
  });

  return (
    <div>
      <div className="section-title">
        <span>My Orders</span>
        <Link to="/" className="section-link">&larr; Back to Shop</Link>
      </div>

      <div className="tabs-bar">
        {['All', 'Delivered', 'Shipped', 'Cancelled'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`tab-button ${filter === tab ? 'active' : ''}`}
          >
            {tab === 'All' ? 'All Orders' : tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>
      ) : filteredOrders.length > 0 ? (
        <div>
          {filteredOrders.map(order => {
            const first = order.items && order.items[0];
            const img = first?.image || first?.product?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80';
            const status = (order.orderStatus || 'Delivered').toLowerCase();

            return (
              <div key={order._id || order.orderId} className="order-item-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img
                    src={img}
                    alt=""
                    style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#f8fafc', borderRadius: '8px' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong>Order #{order.orderId || order._id}</strong>
                      <span className={`order-status-pill ${status}`}>
                        {order.orderStatus || 'Delivered'}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      {first?.name || first?.product?.name || 'Item'}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Total</div>
                  <strong style={{ fontSize: '16px' }}>₹{(order.totalAmount || 1499).toLocaleString('en-IN')}</strong>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', background: '#ffffff', borderRadius: '12px' }}>
          <p>No orders found under {filter}.</p>
        </div>
      )}
    </div>
  );
}
