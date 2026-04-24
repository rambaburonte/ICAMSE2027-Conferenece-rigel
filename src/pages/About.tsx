import React, { useEffect } from 'react';
import { useConference } from '../context/ConferenceContext';
import conferenceImg from '../assets/Conferenec_img01.png';

interface StatisticItem {
  value: number;
  label: string;
}

const About: React.FC = () => {
  const { importantDetails } = useConference();
  // Strip HTML tags (API may return <br> tags)
  const conferenceVenue = importantDetails?.ConferenceVenue
    ? importantDetails.ConferenceVenue.replace(/<[^>]*>/g, '')
    : 'Conference Venue';
  const conferenceDates = importantDetails?.ConferenceDates
    ? importantDetails.ConferenceDates.replace(/<[^>]*>/g, '')
    : 'March 15-16, 2027';
  
  const statistics: StatisticItem[] = [
    { value: 300, label: 'Attendees' },
    { value: 50, label: 'Exhibitors' },
    { value: 40, label: 'Speakers' },
    { value: 15, label: 'Conference Sessions' },
  ];

  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      const duration = 2000;

      counters.forEach((counter: Element) => {
        const target = parseInt((counter as HTMLElement).getAttribute('data-target') || '0', 10);
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            (counter as HTMLElement).textContent = Math.floor(current).toString();
            requestAnimationFrame(updateCounter);
          } else {
            (counter as HTMLElement).textContent = target.toString();
          }
        };

        updateCounter();
      });
    };

    const timer = window.setTimeout(animateCounters, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div style={{ paddingTop: '50px', minHeight: '100vh', background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)' }}>
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
            About the Conference
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

      {/* Main Content */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="container">
          <div className="two-col-wrapper">
            <div className="two-col-content">
              <h2>About the Conference</h2>
              <p>
                The International Conference on Advanced Materials Science and Engineering (ICAMSE 2026) aims to bring together leading scientists, engineers, academicians, industry professionals, and young researchers from around the world to exchange the latest advances, innovations, and challenges in materials science.
              </p>
              <p>
                The conference will serve as a premier interdisciplinary platform to present cutting-edge research on the design, synthesis, characterization, processing, and application of advanced materials across energy, healthcare, electronics, manufacturing, and sustainability sectors.
              </p>
              <p>
                Held in {conferenceVenue}, this conference offers a unique opportunity to foster global collaborations in a high-quality academic and industrial environment.
              </p>

              {/* Statistics */}
              <div className="statistics">
                <div className="statistics__col-wrap">
                  <div className="swiper statistics-slider__swiper1">
                    <div className="swiper-wrapper">
                      {statistics.map((stat) => (
                        <div key={`about-${stat.label}`} className="swiper-slide">
                          <div className="statistics__col">
                            <h4>
                              <span className="counter" data-target={stat.value}>
                                0
                              </span>
                              <span>+</span>
                            </h4>
                            <p>{stat.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              
              
            </div>

            {/* Conference Image */}
            <div className="two-col-media">
              <img 
                src={conferenceImg} 
                alt="International Conference on Advanced Materials Science and Engineering" 
                style={{
                  width: '70%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  objectFit: 'cover',
                  margin: '0 auto'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Conference Objectives Section */}
      <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' }}>
        <div className="container">
          <div className="common-head" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#333', marginBottom: '15px' }}>
              Conference Objectives
            </h2>
          </div>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
              
              {/* Section 1: Academic & Research Excellence */}
              <div>
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '600', 
                  color: '#2c3e50', 
                  marginBottom: '30px',
                  textAlign: 'center',
                  borderBottom: '2px solid #3498db',
                  paddingBottom: '10px'
                }}>
                  Academic & Research Excellence
                </h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  {[
                    'Showcase recent breakthroughs in advanced materials research',
                    'Foster interdisciplinary collaboration across scientific domains',
                    'Encourage young researchers and students to present their work',
                    'Advance fundamental understanding of materials science',
                    'Promote cutting-edge characterization and testing methodologies'
                  ].map((item, index) => (
                    <li key={index} style={{
                      fontSize: '1rem',
                      color: '#555',
                      paddingLeft: '45px',
                      position: 'relative',
                      lineHeight: '1.7',
                    }}>
                      <span style={{
                        content: '""',
                        position: 'absolute',
                        left: '0',
                        top: '5px',
                        width: '30px',
                        height: '30px',
                        background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        boxShadow: '0 2px 8px rgba(52, 152, 219, 0.3)'
                      }}>{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 2: Industry & Innovation Impact */}
              <div>
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '600', 
                  color: '#2c3e50', 
                  marginBottom: '30px',
                  textAlign: 'center',
                  borderBottom: '2px solid #e74c3c',
                  paddingBottom: '10px'
                }}>
                  Industry & Innovation Impact
                </h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  {[
                    'Promote collaboration between academia and industry',
                    'Discuss challenges and future directions in materials science',
                    'Facilitate knowledge exchange through plenary, keynote, and technical sessions',
                    'Bridge the gap between fundamental research and industrial applications',
                    'Accelerate technology transfer and commercialization of materials innovations'
                  ].map((item, index) => (
                    <li key={index} style={{
                      fontSize: '1rem',
                      color: '#555',
                      paddingLeft: '45px',
                      position: 'relative',
                      lineHeight: '1.7',
                    }}>
                      <span style={{
                        content: '""',
                        position: 'absolute',
                        left: '0',
                        top: '5px',
                        width: '30px',
                        height: '30px',
                        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        boxShadow: '0 2px 8px rgba(231, 76, 60, 0.3)'
                      }}>{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
