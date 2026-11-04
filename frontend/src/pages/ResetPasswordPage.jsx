import React, { useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, CheckCircle, KeyRound, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function ResetPasswordPage() {
  const { id, token: urlToken } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState(urlToken || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please provide your email address');
      return;
    }

    if (!otp.trim()) {
      setError('Please enter the 6-digit OTP sent to your email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.auth.resetPassword(email.trim(), otp.trim(), password);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please check your OTP.');
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
        <h2>Reset Password</h2>
        <p>Enter the OTP from your email and create a new password</p>
      </div>

      {success ? (
        <div style={{ textAlign: 'center', padding: '15px' }}>
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            <CheckCircle size={32} style={{ margin: '0 auto 8px auto', display: 'block', color: '#059669' }} />
            <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#065f46' }}>Password Reset Successful!</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#047857' }}>
              Your password has been updated. You can now log in using your new password.
            </p>
          </div>

          <button
            type="button"
            className="btn-yellow"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            onClick={() => navigate('/login')}
          >
            Go to Login <ArrowRight size={16} />
          </button>
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
            <label>Registered Email</label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>6-Digit OTP</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="e.g. 123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                style={{ letterSpacing: '4px', fontWeight: 'bold', fontSize: '16px' }}
              />
            </div>
            <small style={{ color: '#64748b', fontSize: '11px', marginTop: '4px', display: 'block' }}>
              Check your inbox or spam folder for the 6-digit code.
            </small>
          </div>

          <div className="form-group">
            <label>New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-yellow"
            style={{ width: '100%', marginTop: '10px' }}
          >
            {loading ? 'Updating Password...' : 'Reset & Save Password'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link to="/login" style={{ fontSize: '13px', color: '#64748b' }}>
              &larr; Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
