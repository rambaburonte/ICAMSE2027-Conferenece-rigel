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
    <div style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: 'white', backgroundColor: '#274338', padding: '20px', margin: '-20px -20px 20px -20px', borderRadius: '8px 8px 0 0' }}>
          Conference Registration
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="fullName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="affiliation" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Affiliation/Organization</label>
            <input
              type="text"
              id="affiliation"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="country" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Country *</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="registrationType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Registration Type</label>
            <select
              id="registrationType"
              name="registrationType"
              value={formData.registrationType}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            >
              <option value="attendee">Attendee</option>
              <option value="speaker">Speaker</option>
              <option value="student">Student</option>
              <option value="exhibitor">Exhibitor</option>
            </select>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                style={{ marginRight: '10px' }}
              />
              I agree to the terms and conditions *
            </label>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#274338',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;