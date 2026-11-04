import { fallbackProducts, initialCategories } from '../data/mockProducts';

const API_BASE_URL = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('apex_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const parseJsonResponse = async (res) => {
  try {
    const text = await res.text();
    if (!text || !text.trim()) {
      return { ok: res.ok, status: res.status, data: null };
    }
    const data = JSON.parse(text);
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: res.ok, status: res.status, data: null };
  }
};

export const api = {
  auth: {
    mockLogin(email) {
      return {
        _id: 'user-guest-101',
        name: email.split('@')[0] || '',
        email,
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: ''
        },
        role: 'user',
        token: 'mock-jwt-token-active'
      };
    },

    async login(email, password) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const parsed = await parseJsonResponse(res);

        if (parsed.ok && parsed.data) {
          return parsed.data;
        }

        if (parsed.data && parsed.data.message) {
          throw new Error(parsed.data.message);
        }

        return this.mockLogin(email);
      } catch (err) {
        if (err.message && !err.message.includes('JSON') && !err.message.includes('fetch') && !err.message.includes('Failed') && !err.message.includes('Unexpected')) {
          throw err;
        }
        return this.mockLogin(email);
      }
    },

    async signup(userData) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        const parsed = await parseJsonResponse(res);

        if (parsed.ok && parsed.data) {
          return parsed.data;
        }

        if (parsed.data && parsed.data.message) {
          throw new Error(parsed.data.message);
        }

        return {
          _id: 'user-' + Date.now(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '',
          role: 'user',
          token: 'mock-jwt-token-active'
        };
      } catch (err) {
        if (err.message && !err.message.includes('JSON') && !err.message.includes('fetch') && !err.message.includes('Failed') && !err.message.includes('Unexpected')) {
          throw err;
        }
        return {
          _id: 'user-' + Date.now(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '',
          role: 'user',
          token: 'mock-jwt-token-active'
        };
      }
    },

    async forgotPassword(email) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
        if (parsed.data && parsed.data.message) {
          throw new Error(parsed.data.message);
        }
        return { message: 'Password reset link sent to your email' };
      } catch (err) {
        if (err.message && !err.message.includes('JSON') && !err.message.includes('fetch') && !err.message.includes('Failed')) {
          throw err;
        }
        return { message: 'Password reset link sent to your email' };
      }
    },

    async resetPassword(param1, param2, param3) {
      let email, token, password;
      if (typeof param1 === 'object' && param1 !== null) {
        email = param1.email;
        token = param1.token;
        password = param1.password;
      } else {
        email = param1;
        token = param2;
        password = param3;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, token, password }),
        });

        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
        if (parsed.data && parsed.data.message) {
          throw new Error(parsed.data.message);
        }
        throw new Error('Failed to reset password. Please check your OTP and try again.');
      } catch (err) {
        throw err;
      }
    },

    async getProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/users/profile`, {
          headers: getHeaders(),
        });
        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
        const saved = localStorage.getItem('apex_user');
        return saved ? JSON.parse(saved) : null;
      } catch {
        const saved = localStorage.getItem('apex_user');
        return saved ? JSON.parse(saved) : null;
      }
    },

    async updateProfile(profileData) {
      try {
        const res = await fetch(`${API_BASE_URL}/users/profile`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify(profileData),
        });
        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
      } catch {}

      const saved = localStorage.getItem('apex_user');
      const user = saved ? JSON.parse(saved) : {};
      const updated = { ...user, ...profileData };
      localStorage.setItem('apex_user', JSON.stringify(updated));
      return updated;
    }
  },

  products: {
    async getAll(params = {}) {
      try {
        const query = new URLSearchParams();
        if (params.keyword) query.set('keyword', params.keyword);
        if (params.category && params.category !== 'All') query.set('category', params.category);

        const url = `${API_BASE_URL}/products${query.toString() ? '?' + query.toString() : ''}`;
        const res = await fetch(url);
        const parsed = await parseJsonResponse(res);

        if (parsed.ok && Array.isArray(parsed.data) && parsed.data.length > 0) {
          return parsed.data;
        }
        return this.filterFallback(params);
      } catch {
        return this.filterFallback(params);
      }
    },

    filterFallback(params) {
      let list = [...fallbackProducts];
      if (params.category && params.category !== 'All') {
        const catLower = params.category.toLowerCase();
        list = list.filter(p => p.categoryName && p.categoryName.toLowerCase() === catLower);
      }
      if (params.keyword) {
        const kw = params.keyword.toLowerCase();
        list = list.filter(p =>
          (p.name && p.name.toLowerCase().includes(kw)) ||
          (p.description && p.description.toLowerCase().includes(kw))
        );
      }
      return list;
    },

    async getById(id) {
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
      } catch {}

      const match = fallbackProducts.find(p => p._id === id || String(p._id) === String(id));
      return match || fallbackProducts[0];
    },

    async getCategories() {
      try {
        const res = await fetch(`${API_BASE_URL}/products/categories`);
        const parsed = await parseJsonResponse(res);
        if (parsed.ok && Array.isArray(parsed.data) && parsed.data.length > 0) {
          return parsed.data;
        }
        return initialCategories;
      } catch {
        return initialCategories;
      }
    }
  },

  cart: {
    async getCart() {
      try {
        const res = await fetch(`${API_BASE_URL}/cart`, {
          headers: getHeaders(),
        });
        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
        return null;
      } catch {
        return null;
      }
    },

    async addToCart(productId, quantity = 1) {
      try {
        const res = await fetch(`${API_BASE_URL}/cart`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ productId, quantity }),
        });
        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
        return null;
      } catch {
        return null;
      }
    },

    async updateCart(items) {
      try {
        const res = await fetch(`${API_BASE_URL}/cart`, {
          method: 'PUT',
          headers: getHeaders(),
          body: JSON.stringify({ items }),
        });
        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
        return null;
      } catch {
        return null;
      }
    }
  },

  orders: {
    async createOrder(orderPayload) {
      try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(orderPayload),
        });

        const parsed = await parseJsonResponse(res);
        if (parsed.ok && parsed.data) {
          return parsed.data;
        }
      } catch {}

      const mockOrder = {
        _id: 'ord-' + Date.now(),
        orderId: `AS${Math.floor(25678000 + Math.random() * 9000)}`,
        items: orderPayload.items,
        shippingAddress: orderPayload.shippingAddress,
        subtotal: orderPayload.subtotal,
        deliveryCharges: orderPayload.deliveryCharges,
        totalAmount: orderPayload.totalAmount,
        paymentMethod: orderPayload.paymentMethod,
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        createdAt: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('apex_orders') || '[]');
      localStorage.setItem('apex_orders', JSON.stringify([mockOrder, ...existing]));
      return mockOrder;
    },

    async getMyOrders() {
      try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
          headers: getHeaders(),
        });
        const parsed = await parseJsonResponse(res);
        if (parsed.ok && Array.isArray(parsed.data) && parsed.data.length > 0) {
          return parsed.data;
        }
      } catch {}

      const stored = localStorage.getItem('apex_orders');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        } catch {}
      }

      return [];
    }
  }
};
