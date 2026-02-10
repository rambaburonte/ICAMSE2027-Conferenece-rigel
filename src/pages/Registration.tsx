import React, { useState } from 'react';

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    affiliation: '',
    country: '',
    registrationType: 'attendee',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the data. In a real app, send to backend.
    console.log('Registration Data:', formData);
    alert('Registration submitted successfully!');
  };

  return (
    <div style={{ paddingTop: '0', minHeight: '100vh', background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)' }}>
      {/* Page Header */}
      <section style={{
        background: 'transparent',
        padding: '110px 0 60px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            color: 'white'
          }}>
            Conference Registration
          </h1>
          <p style={{
            fontSize: '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.95,
            color: 'white'
          }}>
            Register for ICAMSE 2026 and join the premier materials science conference
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="fullName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', transition: 'border-color 0.3s', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#274338'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', transition: 'border-color 0.3s', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#274338'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', transition: 'border-color 0.3s', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#274338'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="affiliation" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Affiliation/Organization</label>
              <input
                type="text"
                id="affiliation"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', transition: 'border-color 0.3s', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#274338'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="country" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', transition: 'border-color 0.3s', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#274338'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="registrationType" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Registration Type</label>
              <select
                id="registrationType"
                name="registrationType"
                value={formData.registrationType}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', transition: 'border-color 0.3s', outline: 'none', backgroundColor: 'white' }}
                onFocus={(e) => e.target.style.borderColor = '#274338'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              >
                <option value="attendee">Attendee</option>
                <option value="speaker">Speaker</option>
                <option value="student">Student</option>
                <option value="exhibitor">Exhibitor</option>
              </select>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  style={{ marginRight: '12px', marginTop: '4px', width: '18px', height: '18px', accentColor: '#274338' }}
                />
                <span style={{ fontSize: '16px', color: '#555', lineHeight: '1.5' }}>
                  I agree to the <a href="#" style={{ color: '#274338', textDecoration: 'none', fontWeight: '600' }}>terms and conditions</a> and <a href="#" style={{ color: '#274338', textDecoration: 'none', fontWeight: '600' }}>privacy policy</a> *
                </span>
              </label>
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: '#274338',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(39, 67, 56, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1a2d26';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(39, 67, 56, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#274338';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(39, 67, 56, 0.3)';
              }}
            >
              Register Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Registration;