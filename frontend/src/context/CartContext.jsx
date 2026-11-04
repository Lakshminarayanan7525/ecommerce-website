import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('apex_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    localStorage.setItem('apex_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = async (product, quantity = 1) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item => item.product._id === product._id || item.product === product._id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      return [...prevItems, { product, quantity }];
    });

    setHasUnsavedChanges(true);

    if (user && user.token) {
      api.cart.addToCart(product._id, quantity).catch(() => {});
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item => {
        const id = item.product._id || item.product;
        if (id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    setHasUnsavedChanges(true);
  };

  const removeFromCart = (productId) => {
    setItems(prevItems =>
      prevItems.filter(item => {
        const id = item.product._id || item.product;
        return id !== productId;
      })
    );
    setHasUnsavedChanges(true);
  };

  const clearCart = () => {
    setItems([]);
    setHasUnsavedChanges(false);
    localStorage.removeItem('apex_cart');
  };

  const syncCartWithBackend = async () => {
    if (!user) return;
    try {
      const payload = items.map(item => ({
        product: item.product._id || item.product,
        quantity: item.quantity
      }));
      await api.cart.updateCart(payload);
      setHasUnsavedChanges(false);
    } catch (err) {}
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product?.discountPrice ?? item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  const shippingCharges = 0;
  const totalAmount = subtotal + shippingCharges;

  return (
    <CartContext.Provider value={{
      items,
      totalCount,
      subtotal,
      shippingCharges,
      totalAmount,
      hasUnsavedChanges,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      syncCartWithBackend
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
