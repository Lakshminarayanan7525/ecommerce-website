import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <div className="auth-header">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <div className="logo-icon-box">
            <ShoppingBag size={22} />
          </div>
        </div>
        <h2>Welcome Back</h2>
        <p>Please login to your ApexStore account</p>
      </div>

      {error && (
        <div style={{ color: '#ef4444', fontSize: '13px', background: '#fee2e2', padding: '8px', borderRadius: '6px', marginBottom: '12px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-bottom-links">
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" style={{ color: '#f59e0b', fontWeight: 'bold' }}>
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-yellow"
          style={{ width: '100%' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#f59e0b', fontWeight: 'bold' }}>
          Register
        </Link>
      </div>
    </div>
  );
}
