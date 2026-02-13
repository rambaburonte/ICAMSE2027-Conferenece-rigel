import { Link } from 'react-router-dom';
import { useConference } from '../context/ConferenceContext';

const PaymentCancel = () => {
  const { importantDetails } = useConference();
  
  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)' }}>
      <div className="container" style={{ maxWidth: '900px', padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6m0-6l6 6" />
            </svg>
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
            Payment Cancelled
          </h1>
          <p style={{ fontSize: '1.3rem', color: 'white', opacity: 0.95 }}>
            Your payment was not completed
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '40px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '20px', textAlign: 'center', color: '#274338' }}>
            What Happened?
          </h2>
          <p style={{ color: '#666', textAlign: 'center', marginBottom: '30px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Your registration for {importantDetails?.ConferenceTitle || 'ICAMSE 2027'} was not completed because the payment process was cancelled.
          </p>

          <div style={{ background: 'rgba(234, 179, 8, 0.1)', borderLeft: '4px solid #eab308', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#eab308" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
              </svg>
              <div>
                <p style={{ fontSize: '0.95rem', color: '#854d0e', fontWeight: '600', marginBottom: '8px' }}>
                  Don't worry - no charges were made to your account.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#a16207' }}>
                  Your registration information has been saved, and you can complete the payment process at any time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '40px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '24px', color: '#274338' }}>Next Steps</h3>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#274338', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '600' }}>
                1
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>Return to Registration</p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Complete your registration and payment in one easy step
                </p>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#274338', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '600' }}>
                2
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>Contact Support</p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  If you experienced any issues, our team is here to help
                </p>
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#274338', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '600' }}>
                3
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>Try a Different Payment Method</p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  We accept credit cards via Stripe and PayPal payments
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
          <Link to="/registration">
            <button style={{
              padding: '16px 32px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </Link>
          <Link to="/">
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
              Return to Home
            </button>
          </Link>
          <Link to="/contact">
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
              Contact Support
            </button>
          </Link>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '30px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '12px', color: '#274338' }}>Need Help?</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Our team is available to assist you with any questions or concerns.
          </p>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', color: '#666' }}>
            <a href="mailto:contact@icamse2027.com" style={{ color: '#274338', fontWeight: '600', textDecoration: 'none', transition: 'color 0.3s' }}>
              📧 contact@icamse2027.com
            </a>
            <a href="tel:+1234567890" style={{ color: '#274338', fontWeight: '600', textDecoration: 'none', transition: 'color 0.3s' }}>
              📞 +1 (234) 567-8900
            </a>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '0.95rem', color: 'white' }}>
            <strong>Reminder:</strong> Early bird registration rates are available until{' '}
            {importantDetails?.EBD || 'the deadline'}.
            Register soon to save!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
