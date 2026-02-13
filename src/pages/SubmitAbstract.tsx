import React, { useState } from 'react';
import { submitAbstract, getErrorMessage } from '../services/api';
import { useConference } from '../context/ConferenceContext';

const SubmitAbstract: React.FC = () => {
  const { importantDetails, shortName } = useConference();
  // Strip HTML tags (API may return <br> tags)
  const conferenceVenue = importantDetails?.ConferenceVenue
    ? importantDetails.ConferenceVenue.replace(/<[^>]*>/g, '')
    : 'Conference Venue';
  const conferenceDates = importantDetails?.ConferenceDates
    ? importantDetails.ConferenceDates.replace(/<[^>]*>/g, '')
    : 'March 15-16, 2027';
  
  // Get dates from API
  const abstractDeadline = importantDetails?.abstract_submission_deadline
    ? importantDetails.abstract_submission_deadline.replace(/<[^>]*>/g, '')
    : 'May 31, 2026';
  const earlyRegistration = importantDetails?.EarlyBird
    ? importantDetails.EarlyBird.replace(/<[^>]*>/g, '')
    : 'June 30, 2026';
  const notificationDate = importantDetails?.mid_term
    ? importantDetails.mid_term.replace(/<[^>]*>/g, '')
    : 'July 15, 2026';
  const onSpotDate = importantDetails?.OnSpot
    ? importantDetails.OnSpot.replace(/<[^>]*>/g, '')
    : 'March 10, 2027';
  
  const [formData, setFormData] = useState({
    title: 'Mr.',
    name: '',
    paperTitle: '',
    affiliation: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    track: ''
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        e.target.value = '';
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        e.target.value = '';
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please upload your abstract file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      
      // Add all form fields matching backend DTO expectations
      submitData.append('user', shortName || 'ICAMSE2027');
      submitData.append('title', formData.title);
      submitData.append('fname', formData.name);
      submitData.append('country', formData.country);
      submitData.append('org', formData.affiliation);
      submitData.append('email', formData.email);
      submitData.append('phno', formData.phone);
      submitData.append('category', formData.track);
      submitData.append('sentFrom', ''); // Optional field
      submitData.append('trackName', formData.track);
      submitData.append('address', formData.address);
      submitData.append('presentationTitle', formData.paperTitle);
      submitData.append('entity', ''); // Optional field
      
      // Add file
      submitData.append('file', selectedFile);

      const response = await submitAbstract(submitData);
      setReferenceId(response.id || response.submissionId || 'PENDING');
      setIsSubmitted(true);
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
              Abstract Submitted Successfully!
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.95 }}>
              Thank you for submitting your abstract to {importantDetails?.ConferenceTitle?.replace(/<[^>]*>/g, '') || 'ICAMSE 2027'}.
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '30px',
              borderRadius: '12px',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)'
            }}>
              <p style={{ fontSize: '0.9rem', color: '#e0e0e0', marginBottom: '10px' }}>Your Reference ID</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{referenceId}</p>
              <p style={{ fontSize: '0.9rem', color: '#e0e0e0', marginTop: '10px' }}>
                Please save this reference ID for future correspondence.
              </p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '30px',
              borderRadius: '12px',
              textAlign: 'left',
              border: '2px solid rgba(255,255,255,0.1)'
            }}>
              <h3 style={{ fontWeight: '600', textAlign: 'center', marginBottom: '20px' }}>What Happens Next?</h3>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '15px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontWeight: '700',
                  color: '#10b981'
                }}>1</div>
                <p style={{ opacity: 0.9 }}>You will receive a confirmation email within 24 hours</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '15px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontWeight: '700',
                  color: '#10b981'
                }}>2</div>
                <p style={{ opacity: 0.9 }}>Your abstract will undergo peer review</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontWeight: '700',
                  color: '#10b981'
                }}>3</div>
                <p style={{ opacity: 0.9 }}>You will be notified of acceptance status</p>
              </div>
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
                <li><strong>Abstract Deadline:</strong> {abstractDeadline}</li>
                <li><strong>Notification:</strong> {notificationDate}</li>
                <li><strong>Early Registration:</strong> {earlyRegistration}</li>
                <li><strong>Conference:</strong> {conferenceDates}</li>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
                {/* Paper Details Section */}
                <div style={{
                  background: '#f8f9fa',
                  padding: '30px',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: '#274338',
                    marginBottom: '25px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #274338'
                  }}>
                    Paper Details
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    {/* Title Select and Name */}
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px' }}>
                      <div>
                        <label htmlFor="title" style={labelStyle}>Title *</label>
                        <select
                          id="title"
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleChange}
                          style={{ ...inputStyle, cursor: 'pointer', backgroundColor: 'white' }}
                        >
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Dr.">Dr.</option>
                          <option value="Prof.">Prof.</option>
                          <option value="Engr.">Engr.</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="name" style={labelStyle}>Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          style={inputStyle}
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    {/* Paper Title */}
                    <div>
                      <label htmlFor="paperTitle" style={labelStyle}>
                        Paper Title *
                      </label>
                      <input
                        type="text"
                        id="paperTitle"
                        name="paperTitle"
                        required
                        value={formData.paperTitle}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Enter the title of your paper"
                      />
                    </div>

                    {/* Track Selection */}
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
                          cursor: 'pointer',
                          backgroundColor: 'white'
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
                  </div>
                </div>

                {/* Contact Details Section */}
                <div style={{
                  background: '#f8f9fa',
                  padding: '30px',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: '#274338',
                    marginBottom: '25px',
                    paddingBottom: '10px',
                    borderBottom: '2px solid #274338'
                  }}>
                    Contact Details
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                    {/* Email */}
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

                    {/* Country */}
                    <div>
                      <label htmlFor="country" style={labelStyle}>
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Your country"
                      />
                    </div>

                    {/* Phone Number */}
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

                    {/* Organization/Affiliation */}
                    <div>
                      <label htmlFor="affiliation" style={labelStyle}>
                        Organization *
                      </label>
                      <input
                        type="text"
                        id="affiliation"
                        name="affiliation"
                        required
                        value={formData.affiliation}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Your organization or university"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="address" style={labelStyle}>
                        Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        style={{
                          ...inputStyle,
                          resize: 'vertical',
                          minHeight: '80px'
                        }}
                        placeholder="Your complete address"
                      />
                    </div>
                  </div>
                </div>

                {/* File Upload Section */}
                <div style={{
                  border: '2px dashed #e0e0e0',
                  borderRadius: '12px',
                  padding: '40px',
                  textAlign: 'center',
                  background: '#f8f9fa',
                  transition: 'border-color 0.3s ease'
                }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#274338',
                    marginBottom: '10px'
                  }}>
                    Abstract Document * <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>(Required)</span>
                  </h3>
                  <svg width="60" height="60" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ margin: '0 auto 15px', color: '#666' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p style={{ color: '#666', marginBottom: '8px' }}>Upload your abstract document</p>
                  <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '20px' }}>PDF, DOC, or DOCX up to 10MB</p>
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    required
                  />
                  <label htmlFor="file-upload">
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      style={{
                        padding: '12px 30px',
                        background: 'white',
                        color: '#274338',
                        border: '2px solid #274338',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {selectedFile ? selectedFile.name : 'Choose File'}
                    </button>
                  </label>
                  {selectedFile && (
                    <p style={{ color: '#10b981', fontSize: '0.9rem', marginTop: '15px', fontWeight: '600' }}>
                      ✓ File selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? '#9ca3af' : 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                      color: 'white',
                      padding: '18px 60px',
                      border: 'none',
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 20px rgba(39, 67, 56, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Abstract'}
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
