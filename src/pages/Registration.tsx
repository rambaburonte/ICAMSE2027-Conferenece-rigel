import React, { useState } from 'react';
import { createStripePaymentIntent, createPaypalPayment, getErrorMessage } from '../services/api';
import { useConference } from '../context/ConferenceContext';

const Registration: React.FC = () => {
  const { importantDetails, getPricing, getPricingTierLabel, pricingTier } = useConference();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [paymentProvider, setPaymentProvider] = useState('stripe');

  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    email: '',
    phone: '',
    affiliation: '',
    country: '',
    category: ''
  });
  
  // Add-ons
  const [includeAccommodation, setIncludeAccommodation] = useState(false);
  const [accommodationNights, setAccommodationNights] = useState(3);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const getBasePrice = () => {
    return formData.category ? getPricing(formData.category) : 0;
  };

  const calculateTotal = () => {
    let total = getBasePrice();

    if (includeAccommodation) {
      const pricePerNight = 150; // USD per night
      total += pricePerNight * accommodationNights;
    }

    // Add 5% tax
    const tax = total * 0.05;
    total += tax;

    return Math.max(0, total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      setError('Please select a registration category');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const totalAmount = calculateTotal();

      // Build detailed description
      const descParts = [`Registration (${importantDetails?.ShortName || 'ICAMSE2027'}): Registration Price: $${getBasePrice()}`];
      if (includeAccommodation) {
        const pricePerNight = 150;
        descParts.push(`Accommodation: $${pricePerNight} x ${accommodationNights} nights = $${(pricePerNight * accommodationNights).toFixed(2)}`);
      }
      let subtotal = getBasePrice();
      if (includeAccommodation) {
        subtotal += 150 * accommodationNights;
      }
      descParts.push(`Tax (5%): $${(subtotal * 0.05).toFixed(2)}`);
      const description = descParts.join(', ');

      const paymentData = {
        title: formData.title,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        address: '', // Add address field if needed
        org: formData.affiliation,
        paymentProvider: paymentProvider,
        amount: totalAmount,
        currency: 'USD',
        conf: importantDetails?.ShortName || 'ICAMSE2027',
        category: formData.category,
        description,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
        user: importantDetails?.ShortName || 'ICAMSE2027',
      };

      let response;
      if (paymentProvider === 'stripe') {
        response = await createStripePaymentIntent(paymentData);
        // For Stripe, redirect to the URL returned by backend
        if (response.url) {
          window.location.href = response.url;
          return;
        }
      } else if (paymentProvider === 'paypal') {
        response = await createPaypalPayment(paymentData);
        // For PayPal, redirect to approval URL
        if (response.approvalUrl) {
          window.location.href = response.approvalUrl;
          return;
        }
      }

      // Fallback: if no redirect URL, show success
      setRegistrationId(response.id || response.paymentId || 'PENDING');
      setIsSubmitted(true);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = () => {
    const colors: { [key: string]: string } = {
      earlyBird: '#10b981',
      standard: '#eab308',
      final: '#ef4444',
    };
    return colors[pricingTier] || '#6b7280';
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
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px'
            }}>
              <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
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
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '30px',
              borderRadius: '12px',
              textAlign: 'left',
              border: '2px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ fontWeight: '600', textAlign: 'center', marginBottom: '20px' }}>Next Steps</h3>
              <p style={{ marginBottom: '12px', opacity: 0.9 }}>
                • Complete your payment on the {paymentProvider === 'stripe' ? 'Stripe' : 'PayPal'} secure checkout page
              </p>
              <p style={{ marginBottom: '12px', opacity: 0.9 }}>
                • You will be redirected back to our site after payment
              </p>
              <p style={{ marginBottom: '12px', opacity: 0.9 }}>
                • You will receive a confirmation email once payment is processed
              </p>
              <p style={{ opacity: 0.9 }}>
                • Your conference badge and materials will be available at registration desk
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                marginTop: '30px',
                padding: '16px 40px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
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
            margin: '0 auto 20px',
            opacity: 0.95,
            color: 'white'
          }}>
            Register for ICAMSE 2027 and join the premier materials science conference
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: getTierColor()
            }}></span>
            <span style={{ fontWeight: '600', color: 'white' }}>{getPricingTierLabel()} Registration</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Registration Form */}
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              {error && (
                <div style={{
                  padding: '16px',
                  background: '#fee2e2',
                  border: '1px solid #ef4444',
                  borderRadius: '8px',
                  marginBottom: '24px',
                  color: '#b91c1c'
                }}>
                  {error}
                </div>
              )}

              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '30px', color: '#274338' }}>Personal Information</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Title *</label>
                  <select
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', backgroundColor: 'white' }}
                  >
                    <option value="">Select</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fullName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
                  />
                </div>
                <div>
                  <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="affiliation" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '16px' }}>Organization/Affiliation *</label>
                <input
                  type="text"
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
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
                  style={{ width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px' }}
                />
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', marginTop: '40px', color: '#274338' }}>Registration Category *</h2>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
                {[
                  { value: 'delegate', label: 'Delegate', desc: 'General conference attendee' },
                  { value: 'student', label: 'Student', desc: 'Full-time student with valid ID' },
                  { value: 'listener', label: 'Listener', desc: 'Attend sessions only (no presentation)' },
                  { value: 'speaker', label: 'Speaker', desc: 'Oral presentation participant' },
                  { value: 'poster', label: 'Poster Presenter', desc: 'Poster presentation participant' },
                  { value: 'exhibitor', label: 'Exhibitor', desc: 'Exhibition booth representative' }
                ].map((cat) => (
                  <label
                    key={cat.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      border: '2px solid',
                      borderColor: formData.category === cat.value ? '#274338' : '#e0e0e0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: formData.category === cat.value ? 'rgba(39, 67, 56, 0.05)' : 'white',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={formData.category === cat.value}
                      onChange={handleChange}
                      style={{ width: '20px', height: '20px', accentColor: '#274338' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>{cat.label}</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>{cat.desc}</div>
                    </div>
                    {formData.category === cat.value && (
                      <div style={{ fontWeight: '700', color: '#274338', fontSize: '1.1rem' }}>
                        ${getPricing(cat.value)}
                      </div>
                    )}
                  </label>
                ))}
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', color: '#274338' }}>Additional Options</h2>
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', padding: '16px', border: '2px solid #e0e0e0', borderRadius: '8px' }}>
                  <input
                    type="checkbox"
                    checked={includeAccommodation}
                    onChange={(e) => setIncludeAccommodation(e.target.checked)}
                    style={{ marginRight: '12px', marginTop: '4px', width: '20px', height: '20px', accentColor: '#274338' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                      Accommodation
                      <span style={{ marginLeft: '8px', color: '#274338', fontWeight: '700' }}>
                        +${(150 * accommodationNights).toFixed(0)}
                      </span>
                    </div>
                    {includeAccommodation && (
                      <div style={{ marginTop: '12px' }}>
                        <label htmlFor="nights" style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>Number of Nights</label>
                        <select
                          id="nights"
                          value={accommodationNights}
                          onChange={(e) => setAccommodationNights(parseInt(e.target.value))}
                          style={{ width: '100%', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: 'white' }}
                        >
                          <option value="1">1 Night - $150</option>
                          <option value="2">2 Nights - $300</option>
                          <option value="3">3 Nights - $450</option>
                          <option value="4">4 Nights - $600</option>
                          <option value="5">5 Nights - $750</option>
                        </select>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', color: '#274338' }}>Payment Method *</h2>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '30px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    border: '2px solid',
                    borderColor: paymentProvider === 'stripe' ? '#274338' : '#e0e0e0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: paymentProvider === 'stripe' ? 'rgba(39, 67, 56, 0.05)' : 'white'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentProvider"
                    value="stripe"
                    checked={paymentProvider === 'stripe'}
                    onChange={(e) => setPaymentProvider(e.target.value)}
                    style={{ width: '20px', height: '20px', accentColor: '#274338' }}
                  />
                  <div>
                    <div style={{ fontWeight: '600', color: '#333' }}>Credit/Debit Card (Stripe)</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Secure payment via Stripe</div>
                  </div>
                </label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    border: '2px solid',
                    borderColor: paymentProvider === 'paypal' ? '#274338' : '#e0e0e0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: paymentProvider === 'paypal' ? 'rgba(39, 67, 56, 0.05)' : 'white'
                  }}
                >
                  <input
                    type="radio"
                    name="paymentProvider"
                    value="paypal"
                    checked={paymentProvider === 'paypal'}
                    onChange={(e) => setPaymentProvider(e.target.value)}
                    style={{ width: '20px', height: '20px', accentColor: '#274338' }}
                  />
                  <div>
                    <div style={{ fontWeight: '600', color: '#333' }}>PayPal</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Pay with your PayPal account</div>
                  </div>
                </label>
              </div>

              {/* Pricing Summary */}
              <div style={{ marginTop: '40px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '12px', border: '2px solid #e0e0e0' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#274338' }}>Pricing Summary</h2>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e0e0e0' }}>
                      <span style={{ color: '#666' }}>Base Registration ({getPricingTierLabel()})</span>
                      <span style={{ fontWeight: '600' }}>${getBasePrice()}</span>
                    </div>
                    {includeAccommodation && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e0e0e0' }}>
                        <span style={{ color: '#666' }}>Accommodation ({accommodationNights} {accommodationNights === 1 ? 'night' : 'nights'})</span>
                        <span style={{ fontWeight: '600' }}>${(150 * accommodationNights).toFixed(0)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e0e0e0' }}>
                      <span style={{ color: '#666' }}>Subtotal</span>
                      <span style={{ fontWeight: '600' }}>${(() => {
                        let subtotal = getBasePrice();
                        if (includeAccommodation) subtotal += 150 * accommodationNights;
                        return subtotal.toFixed(2);
                      })()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '2px solid #e0e0e0' }}>
                      <span style={{ color: '#666' }}>Tax (5%)</span>
                      <span style={{ fontWeight: '600' }}>${(() => {
                        let subtotal = getBasePrice();
                        if (includeAccommodation) subtotal += 150 * accommodationNights;
                        return (subtotal * 0.05).toFixed(2);
                      })()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '1.3rem', fontWeight: '700', color: '#274338' }}>
                      <span>Total (incl. tax)</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                    <p style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '12px', color: '#333' }}>Registration Includes:</p>
                    <ul style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.8, paddingLeft: '20px' }}>
                      <li>All technical sessions</li>
                      <li>Keynote presentations</li>
                      <li>Coffee breaks & lunches</li>
                      <li>Conference materials</li>
                      <li>Digital proceedings</li>
                      <li>Welcome reception</li>
                      <li>Certificate of attendance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  backgroundColor: loading ? '#9ca3af' : '#274338',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(39, 67, 56, 0.3)'
                }}
              >
                {loading ? 'Processing...' : `Proceed to Payment (${paymentProvider === 'stripe' ? 'Stripe' : 'PayPal'})`}
              </button>
            </form>
        </div>
      </section>
    </div>
  );
};

export default Registration;