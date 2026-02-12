import React, { useEffect, useState } from 'react';
import { useConference } from '../context/ConferenceContext';
import { getMembersByUser } from '../services/api';

interface Speaker {
  id: number;
  name: string;
  affiliation: string;
  photo: string;
  speaker_category?: string;
  category?: string;
  biography?: string;
  designation?: string;
  expertise?: string;
}

const Speakers: React.FC = () => {
  const { loginDetails } = useConference();
  const [speakers, setSpeakers] = useState<Speaker[]>(() => {
    // Initialize with cached data for instant display
    try {
      const cached = localStorage.getItem('conferenceSpeakers');
      const allSpeakers = cached ? JSON.parse(cached) : [];
      return allSpeakers.filter((s: Speaker) =>
        s.category?.toLowerCase() !== 'ocm' && s.speaker_category?.toLowerCase() !== 'ocm'
      );
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadSpeakers = async (username: string) => {
      try {
        setLoading(true);
        console.log('Speakers: Fetching speakers for username:', username);
        const allData = await getMembersByUser(username);
        console.log('Speakers: All members data received:', allData);

        // Filter speakers (exclude OCM only)
        const speakersOnly = (allData || []).filter(
          (member: Speaker) => member.category?.toLowerCase() !== 'ocm' && member.speaker_category?.toLowerCase() !== 'ocm'
        );

        setSpeakers(speakersOnly);
        localStorage.setItem('conferenceSpeakers', JSON.stringify(allData || []));
      } catch (error) {
        console.error('Failed to fetch speakers:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      const username = loginDetails?.username || localStorage.getItem('conferenceUsername');
      
      if (!username) {
        try {
          const cachedLogin = localStorage.getItem('conferenceLoginDetails');
          if (cachedLogin) {
            const parsed = JSON.parse(cachedLogin);
            if (parsed?.username) {
              await loadSpeakers(parsed.username);
              return;
            }
          }
        } catch (e) {
          console.error('Failed to get cached username:', e);
        }
        setLoading(false);
        return;
      }

      await loadSpeakers(username);
    };

    fetchData();
  }, [loginDetails?.username]);

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
          {loading && speakers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #274338',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ marginTop: '20px', color: '#666' }}>Loading speakers...</p>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}} />
            </div>
          )}

          {!loading && speakers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>
                Speaker information will be available soon.
              </p>
            </div>
          )}

          {speakers.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '40px',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              {speakers.map((speaker, index) => (
                <div
                  key={speaker.id || index}
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
                    overflow: 'hidden',
                    background: '#274338'
                  }}>
                    <img
                      src={speaker.photo || `https://via.placeholder.com/300x300/274338/ffffff?text=${speaker.name?.charAt(0) || 'S'}`}
                      alt={speaker.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x300/274338/ffffff?text=${speaker.name?.charAt(0) || 'S'}`;
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
                    {speaker.designation && (
                      <p style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#666',
                        marginBottom: '6px'
                      }}>
                        {speaker.designation}
                      </p>
                    )}
                    {speaker.affiliation && (
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#888',
                        marginBottom: '15px'
                      }}>
                        {speaker.affiliation}
                      </p>
                    )}
                    {(speaker.expertise || speaker.speaker_category) && (
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
                        {speaker.expertise || speaker.speaker_category}
                      </div>
                    )}
                    {speaker.biography && (
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#555',
                        lineHeight: '1.6'
                      }}>
                        {speaker.biography}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

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
