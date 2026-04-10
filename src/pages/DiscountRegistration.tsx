import React, { useState } from 'react';
import { createStripePaymentIntent, createPaypalPayment, getErrorMessage } from '../services/api';
import { useConference } from '../context/ConferenceContext';

const DiscountRegistration: React.FC = () => {
  const { importantDetails } = useConference();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [paymentProvider, setPaymentProvider] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    email: '',
    phone: '',
    affiliation: '',
    country: '',
    amount: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getBaseAmount = () => {
    const value = parseFloat(formData.amount);
    return Number.isFinite(value) && value > 0 ? value : 0;
  };

  const calculateTotal = () => {
    const base = getBaseAmount();
    const tax = base * 0.05;
    return base + tax;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseAmount = getBaseAmount();
    if (baseAmount <= 0) {
      setError('Please enter a valid discount amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tax = baseAmount * 0.05;
      const totalAmount = baseAmount + tax;
      const confCode = importantDetails?.ShortName || 'ICAMSE2027';

      const paymentData = {
        title: formData.title,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        address: '',
        org: formData.affiliation,
        paymentProvider,
        amount: totalAmount,
        currency: 'USD',
        conf: confCode,
        category: 'discount',
        description: `Discount Registration (${confCode}): Base $${baseAmount.toFixed(2)}, Tax (5%): $${tax.toFixed(2)}, Total: $${totalAmount.toFixed(2)}`,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
        user: confCode,
      };

      let response;
      if (paymentProvider === 'stripe') {
        response = await createStripePaymentIntent(paymentData);
        if (response.url) {
          window.location.href = response.url;
          return;
        }
      } else {
        response = await createPaypalPayment(paymentData);
        if (response.approvalUrl) {
          window.location.href = response.approvalUrl;
          return;
        }
      }

      setRegistrationId(response.id || response.paymentId || 'PENDING');
      setIsSubmitted(true);
    } catch (err) {
      setError(getErrorMessage(err));
      console.error('Discount payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ paddingTop: '0', minHeight: '100vh', background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)' }}>
        <section style={{
          background: 'transparent',
          padding: '150px 0',
          textAlign: 'center',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
              Payment Initiated!
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.95 }}>
              You are being redirected to {paymentProvider === 'stripe' ? 'Stripe' : 'PayPal'} to complete your payment.
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '30px',
              borderRadius: '12px',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{ fontSize: '0.9rem', color: '#e0e0e0', marginBottom: '10px' }}>Your Registration ID</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{registrationId}</p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '16px 40px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Return to Home
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '0', minHeight: '100vh', background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)' }}>
      <section style={{
        background: 'transparent',
        padding: '110px 0 60px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
            Discount Registration
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.95, color: 'white' }}>
            Enter your discounted amount and complete payment securely.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            {error && (
              <div style={{ padding: '16px', background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '8px', marginBottom: '24px', color: '#b91c1c' }}>
                {error}
              </div>
            )}

            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '30px', color: '#274338' }}>Personal Information</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Title *</label>
                <select id="title" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
                  <option value="">Select</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                </select>
              </div>
              <div>
                <label htmlFor="fullName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Full Name *</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px' }} />
              </div>
              <div>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Phone *</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="affiliation" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Organization/Affiliation *</label>
              <input type="text" id="affiliation" name="affiliation" value={formData.affiliation} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="country" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Country *</label>
              <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px' }} />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', color: '#274338' }}>Discount Amount *</h2>
            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="amount" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Amount (USD, before tax)</label>
              <input type="number" id="amount" name="amount" min="0" step="0.01" value={formData.amount} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px' }} />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', color: '#274338' }}>Payment Method *</h2>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '2px solid', borderColor: paymentProvider === 'stripe' ? '#274338' : '#e0e0e0', borderRadius: '8px', cursor: 'pointer', background: paymentProvider === 'stripe' ? 'rgba(39, 67, 56, 0.05)' : 'white' }}>
                <input type="radio" name="paymentProvider" value="stripe" checked={paymentProvider === 'stripe'} onChange={(e) => setPaymentProvider(e.target.value)} style={{ width: '20px', height: '20px', accentColor: '#274338' }} />
                <div>
                  <div style={{ fontWeight: '600' }}>Credit/Debit Card (Stripe)</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Secure payment via Stripe</div>
                </div>
              </label>
              {/* <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '2px solid', borderColor: paymentProvider === 'paypal' ? '#274338' : '#e0e0e0', borderRadius: '8px', cursor: 'pointer', background: paymentProvider === 'paypal' ? 'rgba(39, 67, 56, 0.05)' : 'white' }}>
                <input type="radio" name="paymentProvider" value="paypal" checked={paymentProvider === 'paypal'} onChange={(e) => setPaymentProvider(e.target.value)} style={{ width: '20px', height: '20px', accentColor: '#274338' }} />
                <div>
                  <div style={{ fontWeight: '600' }}>PayPal</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>Pay with your PayPal account</div>
                </div>
              </label> */}
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '24px', borderRadius: '12px', border: '2px solid #e0e0e0', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#274338' }}>Pricing Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Base Amount</span><span>${getBaseAmount().toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Tax (5%)</span><span>${(getBaseAmount() * 0.05).toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2rem', marginTop: '10px' }}><span>Total</span><span>${calculateTotal().toFixed(2)}</span></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '18px 24px', backgroundColor: loading ? '#9ca3af' : '#274338', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Processing...' : `Proceed to Payment (${paymentProvider === 'stripe' ? 'Stripe' : 'PayPal'})`}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default DiscountRegistration;
