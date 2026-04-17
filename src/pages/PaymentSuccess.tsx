import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useConference } from '../context/ConferenceContext';
import api from '../services/api';

interface Registration {
  id: string;
  title: string;
  name: string;
  email: string;
  category: string;
  org: string;
  price: number;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [isValidAccess, setIsValidAccess] = useState(false);
  const { importantDetails } = useConference();

  const provider = searchParams.get('provider');
  const token = provider === 'paypal' ? searchParams.get('paymentId') : searchParams.get('session_id');
  const payerId = searchParams.get('PayerID');
  const registrationId = searchParams.get('registration_id');
  const username = searchParams.get('username');

  useEffect(() => {
    const confirmAndFetch = async () => {
      // Validate that user came from payment gateway
      if (!token || !provider) {
        console.error('Invalid access - missing payment parameters');
        setIsValidAccess(false);
        setLoading(false);
        return;
      }

      // Check if this payment has already been confirmed
      const confirmationKey = `payment_confirmed_${token}`;
      const alreadyConfirmed = localStorage.getItem(confirmationKey);

      if (alreadyConfirmed === 'true') {
        console.log('Payment already confirmed, skipping API call');
        setPaymentStatus('Payment already confirmed.');
        setIsValidAccess(true);
        // Fetch registration details if registrationId is present
        if (registrationId) {
          try {
            const response = await api.get(`/registrations/${registrationId}`);
            setRegistration(response.data);
          } catch (error) {
            console.error('Error fetching registration:', error);
          }
        }
        setLoading(false);
        return;
      }

      let confirmed = false;
      let statusMsg: string | null = null;
      try {
        if (token && provider === 'stripe') {
          const res = await api.post('/payment/stripe/success', { token, username });
          confirmed = res.data.status === 'success';
          statusMsg = res.data.status === 'success' ? 'Payment confirmed by Stripe.' : (res.data.error || 'Stripe payment not completed.');
          if (res.data.status === 'success') {
            localStorage.setItem(confirmationKey, 'true');
            setIsValidAccess(true);
          }
        } else if (token && provider === 'paypal') {
          const res = await api.post('/payment/paypal/success', { token, payerId, username });
          confirmed = res.data.status === 'success';
          statusMsg = res.data.status === 'success' ? 'Payment confirmed by PayPal.' : (res.data.error || 'PayPal payment not completed.');
          if (res.data.status === 'success') {
            localStorage.setItem(confirmationKey, 'true');
            setIsValidAccess(true);
          }
        }
      } catch (err: unknown) {
        const error = err as { response?: { data?: { error?: string } }; message?: string };
        statusMsg = 'Payment confirmation error: ' + (error?.response?.data?.error || (error as Error)?.message || 'Unknown error');
        console.error('Payment confirmation error:', err);
        setIsValidAccess(false);
      }
      // Fallback: If not confirmed, try updating status by token
      if (!confirmed && token) {
        try {
          const res = await api.post('/payment/update-status-by-token', { token });
          statusMsg = res.data.status === 'updated' ? 'Payment status updated in system.' : (res.data.error || 'Could not update payment status.');
          if (res.data.status === 'updated') {
            localStorage.setItem(confirmationKey, 'true');
            setIsValidAccess(true);
          }
        } catch (fallbackErr: unknown) {
          const error = fallbackErr as { response?: { data?: { error?: string } }; message?: string };
          statusMsg = 'Fallback status update error: ' + (error?.response?.data?.error || (error as Error)?.message || 'Unknown error');
          console.error('Fallback status update error:', fallbackErr);
          setIsValidAccess(false);
        }
      }
      setPaymentStatus(statusMsg);
      
      // Only fetch registration if payment was successful
      if (confirmed && registrationId) {
        try {
          const response = await api.get(`/registrations/${registrationId}`);
          setRegistration(response.data);
        } catch (error) {
          console.error('Error fetching registration:', error);
        }
      }
      setLoading(false);
    };
    confirmAndFetch();
  }, [registrationId, token, provider, payerId, username]);

  if (loading) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 30px'
          }}></div>
          <p style={{ color: 'white', fontSize: '1.2rem' }}>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if invalid access
  if (!isValidAccess) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px'
          }}>
            <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
            Invalid Access
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.95, color: 'white' }}>
            This page can only be accessed after completing a payment through our registration system.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/registration">
              <button style={{
                padding: '16px 40px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Go to Registration
              </button>
            </Link>
            <Link to="/">
              <button style={{
                padding: '16px 40px',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)' }}>
      <div className="container" style={{ maxWidth: '900px', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            animation: 'bounce 1s ease-in-out'
          }}>
            <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
            Payment Successful!
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'white', opacity: 0.95 }}>
            Thank you for registering for {importantDetails?.ConferenceTitle || 'ICAMSE 2027'}
          </p>
          {token && (
            <div style={{ marginTop: '20px' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>
                {provider === 'paypal' ? 'Order ID' : 'Session ID'}:
              </span>
              <span style={{ marginLeft: '10px', fontFamily: 'monospace', color: '#10b981', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '6px', fontSize: '0.95rem' }}>
                {token}
              </span>
            </div>
          )}
          {paymentStatus && (
            <div style={{ marginTop: '10px' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>Payment Status:</span>
              <span style={{ marginLeft: '10px', color: '#10b981' }}>{paymentStatus}</span>
            </div>
          )}
        </div>

        {registration && (
          <div style={{ background: 'rgba(255,255,255,0.95)', padding: '40px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '30px', textAlign: 'center', color: '#274338' }}>
              Registration Confirmed
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #e0e0e0' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Registration ID:</span>
                <span style={{ fontWeight: '700', color: '#274338', fontSize: '1.1rem' }}>{registration.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #e0e0e0' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Name:</span>
                <span style={{ fontWeight: '600', color: '#333' }}>
                  {registration.title} {registration.name}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #e0e0e0' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Email:</span>
                <span style={{ color: '#333' }}>{registration.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #e0e0e0' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Category:</span>
                <span style={{ fontWeight: '600', color: '#333', textTransform: 'capitalize' }}>
                  {registration.category}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #e0e0e0' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Organization:</span>
                <span style={{ color: '#333' }}>{registration.org}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Amount Paid:</span>
                <span style={{ fontWeight: '700', color: '#10b981', fontSize: '1.5rem' }}>
                  €{registration.price}
                </span>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '20px', color: '#274338', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Next Steps
          </h3>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#274338', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '600' }}>
                1
              </div>
              <p style={{ color: '#666', flex: 1, lineHeight: 1.6 }}>
                A confirmation email has been sent to your registered email address with your receipt and registration details.
              </p>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#274338', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '600' }}>
                2
              </div>
              <p style={{ color: '#666', flex: 1, lineHeight: 1.6 }}>
                Your conference badge and materials will be available for pickup at the registration desk on the day of the conference.
              </p>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#274338', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '600' }}>
                3
              </div>
              <p style={{ color: '#666', flex: 1, lineHeight: 1.6 }}>
                Add the conference dates to your calendar and prepare for an amazing experience!
              </p>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#274338" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#274338' }}>Mark Your Calendar</h3>
          </div>
          <p style={{ color: '#666', marginBottom: '12px', fontSize: '1.1rem' }}>
            {importantDetails?.ConferenceTitle || 'ICAMSE 2027'} • {importantDetails?.ConferenceDates || 'Conference Dates TBA'}
          </p>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            📍 {importantDetails?.Venue || 'Conference Venue'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
          <button
            onClick={() => window.print()}
            style={{
              padding: '16px 32px',
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Print Confirmation
          </button>
          <Link to="/">
            <button style={{
              padding: '16px 32px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              Return to Home
            </button>
          </Link>
          <Link to="/schedule">
            <button style={{
              padding: '16px 32px',
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              View Program
            </button>
          </Link>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '0.95rem', color: 'white' }}>
            Need help? Contact us at{' '}
            <a href="mailto:contact@icamse2027.com" style={{ color: '#10b981', fontWeight: '600', textDecoration: 'underline' }}>
              contact@icamse2027.com
            </a>
            {' '}or{' '}
            <a href="tel:+1234567890" style={{ color: '#10b981', fontWeight: '600', textDecoration: 'underline' }}>
              +1 (234) 567-8900
            </a>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
