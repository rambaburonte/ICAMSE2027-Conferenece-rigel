import React from 'react';
import confImg1 from '../assets/Conferenec_img02.png';
import confImg2 from '../assets/Conferenec_img03.png';
import confImg3 from '../assets/Conferenec_img04.png';
import confImg4 from '../assets/Conferenec_img05.png';

const Gallery: React.FC = () => {
  const galleryImages = [
    { src: confImg1, title: 'Conference Hallway', category: 'Venue' },
    { src: confImg2, title: 'Conference Group Photo', category: 'Networking' },
    { src: confImg3, title: 'Conference Leaders', category: 'Speakers' },
    { src: confImg4, title: 'Conference Networking', category: 'Networking' },
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', title: 'Keynote Session', category: 'Sessions' },
    { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop', title: 'Poster Session', category: 'Sessions' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop', title: 'Exhibition', category: 'Exhibition' },
    { src: 'https://images.unsplash.com/photo-1519167758481-83f29da8339a?w=600&h=400&fit=crop', title: 'Gala Dinner', category: 'Networking' },
    { src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop', title: 'Technical Workshop', category: 'Sessions' },
    { src: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=600&h=400&fit=crop', title: 'Awards Ceremony', category: 'Events' },
    { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop', title: 'Panel Discussion', category: 'Sessions' },
    { src: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop', title: 'Bern City Tour', category: 'Events' }
  ];

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
            Conference Gallery
          </h1>
          <p style={{
            fontSize: '1.3rem',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.95,
            color: 'white'
          }}>
            Explore highlights from past conferences and get a glimpse of what awaits at ICAMSE 2026
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {galleryImages.map((image, index) => (
              <div key={index} style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                height: '280px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
              }}>
                <img
                  src={image.src}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div className="overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(39, 67, 56, 0.9) 0%, rgba(39, 67, 56, 0.3) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: 'white',
                    display: 'inline-block',
                    marginBottom: '10px',
                    alignSelf: 'flex-start'
                  }}>
                    {image.category}
                  </div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: 'white',
                    margin: 0
                  }}>
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div style={{
            marginTop: '80px',
            background: 'white',
            borderRadius: '16px',
            padding: '50px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              color: '#274338',
              marginBottom: '20px'
            }}>
              ICAMSE 2026 - Creating New Memories
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 30px',
              lineHeight: '1.7'
            }}>
              Join us in Bern, Switzerland for three unforgettable days of cutting-edge research presentations, networking opportunities, and memorable experiences.
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

export default Gallery;
