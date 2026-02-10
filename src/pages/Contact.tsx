import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope size={30} />,
      title: 'Email Us',
      details: ['info@americaslngsummit.com', 'support@americaslngsummit.com'],
      color: '#3498db'
    },
    {
      icon: <FaPhone size={30} />,
      title: 'Call Us',
      details: ['+41 31 123 4567', '+41 31 765 4321'],
      color: '#27ae60'
    },
    {
      icon: <FaMapMarkerAlt size={30} />,
      title: 'Visit Us',
      details: ['Bern Convention Center', 'Bern, Switzerland'],
      color: '#e74c3c'
    }
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
    <div style={{ paddingTop: '110px', minHeight: '100vh' }}>
      {/* Page Header */}
      <section style={{
        background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)',
        padding: '80px 0 60px',
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
            Contact Us
          </h1>
          <p style={{
            fontSize: '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.95,
            color: 'white'
          }}>
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section style={{ padding: '80px 0 40px', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {contactInfo.map((info, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '40px 30px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                borderTop: `4px solid ${info.color}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70px',
                  height: '70px',
                  background: `${info.color}20`,
                  borderRadius: '50%',
                  color: info.color,
                  marginBottom: '20px'
                }}>
                  {info.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  color: '#274338',
                  marginBottom: '15px'
                }}>
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} style={{
                    fontSize: '1rem',
                    color: '#666',
                    marginBottom: '5px'
                  }}>
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div style={{
            background: 'white',
            padding: '50px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#274338',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label htmlFor="name" style={labelStyle}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" style={labelStyle}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    style={{
                      ...inputStyle,
                      resize: 'vertical'
                    }}
                    placeholder="Type your message here..."
                  />
                </div>

                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                      color: 'white',
                      padding: '16px 50px',
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
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Social Media */}
          <div style={{
            background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
            padding: '50px',
            borderRadius: '16px',
            textAlign: 'center',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              marginBottom: '15px'
            }}>
              Connect With Us
            </h3>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '30px',
              opacity: 0.95
            }}>
              Follow us on social media for the latest updates
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center'
            }}>
              {[
                { icon: <FaFacebookF size={20} />, url: '#' },
                { icon: <FaTwitter size={20} />, url: '#' },
                { icon: <FaLinkedinIn size={20} />, url: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#274338';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
