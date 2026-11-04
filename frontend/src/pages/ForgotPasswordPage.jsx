import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Mail, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.auth.forgotPassword(email);
      setMsg(res.message || 'A 6-digit OTP has been sent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to send reset OTP. Please check your email.');
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
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a 6-digit password reset OTP</p>
      </div>

      {msg ? (
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            borderRadius: '8px',
            padding: '14px',
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            <Mail size={24} style={{ margin: '0 auto 8px auto', display: 'block', color: '#059669' }} />
            {msg}
          </div>

          <button
            type="button"
            className="btn-yellow"
            style={{ width: '100%', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            onClick={() => navigate('/reset-password', { state: { email } })}
          >
            Enter OTP & Reset Password <ArrowRight size={16} />
          </button>

          <Link to="/login" style={{ color: '#64748b', fontSize: '13px' }}>
            &larr; Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '10px',
              borderRadius: '6px',
              fontSize: '13px',
              marginBottom: '14px'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-yellow"
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? 'Sending OTP...' : 'Send Reset OTP'}
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '13px' }}>
            <Link to="/login" style={{ color: '#64748b' }}>
              &larr; Back to Login
            </Link>
            <Link to="/reset-password" style={{ color: '#f59e0b', fontWeight: '500' }}>
              Already have an OTP?
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
