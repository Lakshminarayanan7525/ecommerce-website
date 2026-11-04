import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const {
    items,
    totalCount,
    subtotal,
    shippingCharges,
    totalAmount,
    updateQuantity,
    removeFromCart,
    syncCartWithBackend
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = async () => {
    await syncCartWithBackend();
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <ShoppingBag size={48} color="#f59e0b" style={{ margin: '0 auto 15px' }} />
        <h2>Your Cart is Empty</h2>
        <p style={{ color: '#64748b', margin: '8px 0 20px' }}>Add some products to your shopping bag</p>
        <Link to="/" className="hero-shop-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">
        <span>Shopping Cart ({totalCount} items)</span>
        <Link to="/" className="section-link">&larr; Back to Shop</Link>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map(item => {
            const product = item.product;
            const price = product?.discountPrice ?? product?.price ?? 0;
            const productId = product?._id || product;

            return (
              <div key={productId} className="cart-item-card">
                <div className="cart-item-img">
                  <img src={product?.image} alt={product?.name} />
                </div>

                <div className="cart-item-details">
                  <h4>{product?.name}</h4>
                  <div className="cart-item-price">₹{price.toLocaleString('en-IN')}</div>
                </div>

                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => updateQuantity(productId, item.quantity - 1)}>-</button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(productId, item.quantity + 1)}>+</button>
                </div>

                <button className="delete-btn" onClick={() => removeFromCart(productId)} title="Delete item">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="summary-card">
          <div className="summary-title">Order Summary</div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong style={{ color: '#16a34a' }}>{shippingCharges === 0 ? 'FREE' : `₹${shippingCharges}`}</strong>
          </div>

          <div className="summary-row summary-total">
            <span>Total Amount</span>
            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="btn-yellow"
            style={{ width: '100%', marginTop: '15px' }}
          >
            Proceed to Checkout &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
