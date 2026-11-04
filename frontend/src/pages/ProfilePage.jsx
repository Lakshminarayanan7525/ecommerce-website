import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      pincode: user?.address?.pincode || '',
    }
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
        <h2>Please Login</h2>
        <p style={{ color: '#64748b', margin: '10px 0 20px' }}>You must be logged in to view your profile and saved address.</p>
        <a href="/login" className="btn-yellow" style={{ display: 'inline-block' }}>Go to Login</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="section-title">
        <span>My Profile & Address</span>
      </div>

      <div className="white-panel">
        {saved && (
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px' }}>
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email (Read only)</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              style={{ background: '#f1f5f9' }}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address, street: e.target.value }
              })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value }
                })}
              />
            </div>
            <div className="form-group">
              <label>PIN Code</label>
              <input
                type="text"
                value={formData.address.pincode}
                onChange={(e) => setFormData({
                  ...formData,
                  address: { ...formData.address, pincode: e.target.value }
                })}
              />
            </div>
          </div>

          <button type="submit" className="btn-yellow" style={{ marginTop: '10px' }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
