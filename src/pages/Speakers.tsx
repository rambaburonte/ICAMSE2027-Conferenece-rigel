import React from 'react';

const Speakers: React.FC = () => {
  const speakers = [
    {
      name: 'Dr. Sarah Mitchell',
      title: 'Chief Materials Scientist',
      organization: 'MIT Materials Lab',
      expertise: 'Nanomaterials & 2D Materials',
      image: 'https://via.placeholder.com/300x300/274338/ffffff?text=SM',
      bio: 'Leading expert in nanomaterial synthesis with over 200 publications'
    },
    {
      name: 'Prof. James Chen',
      title: 'Distinguished Professor',
      organization: 'Stanford University',
      expertise: 'Energy Storage Materials',
      image: 'https://via.placeholder.com/300x300/3d5a4f/ffffff?text=JC',
      bio: 'Pioneer in battery technology and sustainable energy materials'
    },
    {
      name: 'Dr. Maria Rodriguez',
      title: 'Director of Research',
      organization: 'ETH Zurich',
      expertise: 'Biomaterials & Tissue Engineering',
      image: 'https://via.placeholder.com/300x300/274338/ffffff?text=MR',
      bio: 'Award-winning researcher in biomedical materials applications'
    },
    {
      name: 'Prof. David Kumar',
      title: 'Department Head',
      organization: 'Cambridge University',
      expertise: 'Computational Materials Science',
      image: 'https://via.placeholder.com/300x300/3d5a4f/ffffff?text=DK',
      bio: 'Expert in AI-driven materials discovery and simulation'
    },
    {
      name: 'Dr. Lisa Anderson',
      title: 'Senior Scientist',
      organization: 'Max Planck Institute',
      expertise: 'Polymer Science',
      image: 'https://via.placeholder.com/300x300/274338/ffffff?text=LA',
      bio: 'Specialist in sustainable polymers and green chemistry'
    },
    {
      name: 'Prof. Robert Taylor',
      title: 'Chair Professor',
      organization: 'Oxford University',
      expertise: 'Advanced Alloys & Composites',
      image: 'https://via.placeholder.com/300x300/3d5a4f/ffffff?text=RT',
      bio: 'Leading authority in aerospace materials development'
    }
  ];

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
            Keynote Speakers
          </h1>
          <p style={{
            fontSize: '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.95,
            color: 'white'
          }}>
            Learn from world-renowned experts and thought leaders in materials science
          </p>
        </div>
      </section>

      {/* Speakers Grid */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {speakers.map((speaker, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                {/* Speaker Image */}
                <div style={{
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Speaker Info */}
                <div style={{ padding: '30px' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#274338',
                    marginBottom: '8px'
                  }}>
                    {speaker.name}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#666',
                    marginBottom: '6px'
                  }}>
                    {speaker.title}
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#888',
                    marginBottom: '15px'
                  }}>
                    {speaker.organization}
                  </p>
                  <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: '#274338',
                    marginBottom: '15px'
                  }}>
                    {speaker.expertise}
                  </div>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#555',
                    lineHeight: '1.6'
                  }}>
                    {speaker.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div style={{
            textAlign: 'center',
            marginTop: '60px'
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: '#555',
              marginBottom: '30px'
            }}>
              More speakers will be announced soon!
            </p>
            <div className="btn-wrap">
              <div className="btn-theme-3">
                <a href="forms/del-reg/delegate-registration/index.html">
                  REGISTER NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Speakers;
