import React, { useState } from 'react';
import { submitAbstract, getErrorMessage } from '../services/api';
import { useConference } from '../context/ConferenceContext';

const SubmitAbstract: React.FC = () => {
  const { importantDetails } = useConference();
  // Strip HTML tags (API may return <br> tags)
  const conferenceVenue = importantDetails?.ConferenceVenue
    ? importantDetails.ConferenceVenue.replace(/<[^>]*>/g, '')
    : 'Conference Venue';
  const conferenceDates = importantDetails?.ConferenceDates
    ? importantDetails.ConferenceDates.replace(/<[^>]*>/g, '')
    : 'March 15-16, 2027';
  
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    affiliation: '',
    email: '',
    phone: '',
    track: '',
    presentationType: '',
    abstract: '',
    keywords: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      submitData.append('user', importantDetails?.ShortName || 'ICAMSE2027');

      await submitAbstract(submitData);
      alert('Abstract submitted successfully! You will receive a confirmation email shortly.');
      // Reset form
      setFormData({
        title: '',
        authors: '',
        affiliation: '',
        email: '',
        phone: '',
        track: '',
        presentationType: '',
        abstract: '',
        keywords: ''
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const tracks = [
    'Advanced & Functional Materials',
    'Materials Processing & Manufacturing',
    'Energy & Sustainable Materials',
    'Computational & AI-Driven Materials Science',
    'Characterization & Testing Techniques',
    'Biomaterials & Healthcare Applications',
    'Structural & Industrial Materials',
    'Smart Coatings & Surface Engineering',
    'Polymer Science & Engineering',
    'Materials for Electronics & Photonics',
    'Environmental & Green Materials',
    'Materials Education & Outreach'
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    fontFamily: 'inherit'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '1rem'
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
            Submit Your Abstract
          </h1>
          <p style={{
            fontSize: '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.95,
            color: 'white'
          }}>
            {conferenceDates} • {conferenceVenue}
          </p>
        </div>
      </section>

      {/* Submission Guidelines */}
      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            <div style={{
              background: 'white',
              padding: '35px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderTop: '4px solid #3498db'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#274338', marginBottom: '15px' }}>
                Important Dates
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
                <li><strong>Abstract Deadline:</strong> May 31, 2026</li>
                <li><strong>Notification:</strong> July 15, 2026</li>
                <li><strong>Early Registration:</strong> June 30, 2026</li>
                <li><strong>Conference:</strong> Oct 13-15, 2026</li>
              </ul>
            </div>

            <div style={{
              background: 'white',
              padding: '35px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderTop: '4px solid #e67e22'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#274338', marginBottom: '15px' }}>
                Presentation Types
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
                <li>✓ Oral Presentation (20 min)</li>
                <li>✓ Poster Presentation</li>
                <li>✓ Virtual Presentation</li>
                <li>✓ Young Researcher Forum</li>
              </ul>
            </div>

            <div style={{
              background: 'white',
              padding: '35px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              borderTop: '4px solid #27ae60'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#274338', marginBottom: '15px' }}>
                Guidelines
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
                <li>✓ 250-300 words</li>
                <li>✓ English language only</li>
                <li>✓ Include 3-5 keywords</li>
                <li>✓ Follow template format</li>
              </ul>
            </div>
          </div>

          {/* Submission Form */}
          <div style={{
            background: 'white',
            padding: '50px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#274338',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Abstract Submission Form
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
                {/* Paper Title */}
                <div>
                  <label htmlFor="title" style={labelStyle}>
                    Paper Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Enter the title of your paper"
                  />
                </div>

                {/* Authors */}
                <div>
                  <label htmlFor="authors" style={labelStyle}>
                    Authors (Full Names) *
                  </label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    required
                    value={formData.authors}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="John Doe, Jane Smith, et al."
                  />
                </div>

                {/* Affiliation */}
                <div>
                  <label htmlFor="affiliation" style={labelStyle}>
                    Affiliation *
                  </label>
                  <input
                    type="text"
                    id="affiliation"
                    name="affiliation"
                    required
                    value={formData.affiliation}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="University/Organization, Department, Country"
                  />
                </div>

                {/* Contact Information */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label htmlFor="email" style={labelStyle}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" style={labelStyle}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                {/* Track Selection */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label htmlFor="track" style={labelStyle}>
                      Select Track *
                    </label>
                    <select
                      id="track"
                      name="track"
                      required
                      value={formData.track}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">Choose a track...</option>
                      {tracks.map((track, index) => (
                        <option key={index} value={track}>
                          {track}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="presentationType" style={labelStyle}>
                      Presentation Type *
                    </label>
                    <select
                      id="presentationType"
                      name="presentationType"
                      required
                      value={formData.presentationType}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">Select type...</option>
                      <option value="oral">Oral Presentation</option>
                      <option value="poster">Poster Presentation</option>
                      <option value="virtual">Virtual Presentation</option>
                      <option value="young-researcher">Young Researcher Forum</option>
                    </select>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label htmlFor="keywords" style={labelStyle}>
                    Keywords (3-5 keywords) *
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    required
                    value={formData.keywords}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Nanomaterials, Energy Storage, Biomaterials..."
                  />
                </div>

                {/* Abstract */}
                <div>
                  <label htmlFor="abstract" style={labelStyle}>
                    Abstract (250-300 words) *
                  </label>
                  <textarea
                    id="abstract"
                    name="abstract"
                    required
                    value={formData.abstract}
                    onChange={handleChange}
                    rows={10}
                    style={{
                      ...inputStyle,
                      resize: 'vertical'
                    }}
                    placeholder="Enter your abstract here..."
                  />
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                      color: 'white',
                      padding: '18px 60px',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(39, 67, 56, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 25px rgba(39, 67, 56, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(39, 67, 56, 0.3)';
                    }}
                  >
                    Submit Abstract
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitAbstract;
