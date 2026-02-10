import React from 'react';

const Sponsors: React.FC = () => {
  const sponsors = {
    platinum: [
      { name: 'Swiss Materials Research Institute', logo: 'https://via.placeholder.com/250x120/274338/ffffff?text=SMRI' },
      { name: 'Global Energy Systems', logo: 'https://via.placeholder.com/250x120/274338/ffffff?text=GES' }
    ],
    gold: [
      { name: 'Advanced Materials Corp', logo: 'https://via.placeholder.com/200x100/3d5a4f/ffffff?text=AMC' },
      { name: 'Nano-Tech Solutions', logo: 'https://via.placeholder.com/200x100/3d5a4f/ffffff?text=NTS' },
      { name: 'Green Chemistry Alliance', logo: 'https://via.placeholder.com/200x100/3d5a4f/ffffff?text=GCA' }
    ],
    silver: [
      { name: 'Polymer Innovations', logo: 'https://via.placeholder.com/180x90/5a7a6d/ffffff?text=PI' },
      { name: 'Materials Testing Lab', logo: 'https://via.placeholder.com/180x90/5a7a6d/ffffff?text=MTL' },
      { name: 'Sustainable Materials Co', logo: 'https://via.placeholder.com/180x90/5a7a6d/ffffff?text=SMC' },
      { name: 'Alloy Dynamics', logo: 'https://via.placeholder.com/180x90/5a7a6d/ffffff?text=AD' }
    ],
    bronze: [
      { name: 'Research Instruments Inc', logo: 'https://via.placeholder.com/160x80/7a9a8d/ffffff?text=RII' },
      { name: 'Bio-Materials Group', logo: 'https://via.placeholder.com/160x80/7a9a8d/ffffff?text=BMG' },
      { name: 'Chemical Synthesis Ltd', logo: 'https://via.placeholder.com/160x80/7a9a8d/ffffff?text=CSL' },
      { name: 'Smart Coatings Tech', logo: 'https://via.placeholder.com/160x80/7a9a8d/ffffff?text=SCT' },
      { name: 'Materials Database Pro', logo: 'https://via.placeholder.com/160x80/7a9a8d/ffffff?text=MDP' }
    ]
  };

  const SponsorSection = ({ title, sponsors, color }: { title: string; sponsors: any[]; color: string }) => (
    <div style={{ marginBottom: '60px' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#274338',
          marginBottom: '10px',
          display: 'inline-block',
          position: 'relative'
        }}>
          {title}
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '3px',
            background: color,
            borderRadius: '2px'
          }}></div>
        </h3>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {sponsors.map((sponsor, index) => (
          <div key={index} style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
          }}>
            <img src={sponsor.logo} alt={sponsor.name} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );

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
            Our Sponsors
          </h1>
          <p style={{
            fontSize: '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.95,
            color: 'white'
          }}>
            Thank you to our valued partners and sponsors making ICAMSE 2026 possible
          </p>
        </div>
      </section>

      {/* Sponsors Content */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <SponsorSection title="Platinum Sponsors" sponsors={sponsors.platinum} color="#E5E4E2" />
          <SponsorSection title="Gold Sponsors" sponsors={sponsors.gold} color="#FFD700" />
          <SponsorSection title="Silver Sponsors" sponsors={sponsors.silver} color="#C0C0C0" />
          <SponsorSection title="Bronze Sponsors" sponsors={sponsors.bronze} color="#CD7F32" />

          {/* Become a Sponsor CTA */}
          <div style={{
            marginTop: '80px',
            background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
            borderRadius: '20px',
            padding: '60px 40px',
            textAlign: 'center',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '2.2rem',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              Become a Sponsor
            </h3>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '30px',
              maxWidth: '700px',
              margin: '0 auto 30px',
              opacity: 0.95
            }}>
              Join us as a sponsor and gain global visibility, connect with leading researchers, and showcase your innovations to thousands of attendees.
            </p>
            <div className="btn-wrap">
              <div className="btn-theme-4">
                <a href="forms/book-your-booth/index.html">
                  VIEW SPONSORSHIP PACKAGES
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
