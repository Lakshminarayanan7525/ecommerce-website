import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function PaymentSuccessPage() {
  const { id } = useParams();
  const orderId = id || 'AS25678945';

  return (
    <div className="success-box">
      <div className="success-icon-round">
        <Check size={36} />
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>
        Payment Successful!
      </h1>

      <p style={{ color: '#64748b', fontSize: '14px' }}>
        Your order has been placed successfully.
      </p>

      <div className="order-badge-id">
        Order ID: #{orderId}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Link to="/orders" className="btn-yellow">
          View Your Order
        </Link>
        <Link to="/" className="btn-dark">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
