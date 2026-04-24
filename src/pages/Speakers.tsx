import React, { useEffect, useState } from 'react';
import { useConference } from '../context/ConferenceContext';
import { getMembersByUser } from '../services/api';
import { MdSchool, MdEmail, MdRecordVoiceOver, MdGroups } from 'react-icons/md';

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
  role?: string;
}

const Speakers: React.FC = () => {
  const { loginDetails } = useConference();
  
  // Conference contact emails
  const contactEmails = [
    'secretary@icamse2027.com',
    'contact@icamse2027.com',
    'info@icamse2027.com',
  ];
  
  const [speakers, setSpeakers] = useState<Speaker[]>(() => {
    // Initialize with cached data for instant display
    try {
      const cached = localStorage.getItem('conferenceSpeakers');
      const allSpeakers = cached ? JSON.parse(cached) : [];
      // Show all speakers except OCM (same as robofuture pattern)
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

        // Filter speakers (exclude OCM only, same as robofuture pattern)
        const speakersOnly = (allData || []).filter(
          (member: Speaker) => 
            member.category?.toLowerCase() !== 'ocm' && 
            member.speaker_category?.toLowerCase() !== 'ocm'
        );

        setSpeakers(speakersOnly);
        // Cache all members data
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
            Speakers
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

      {/* Speakers Grid - ICANET Style */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
            color: '#274338',
            marginBottom: '20px'
          }}>
            Speakers
          </h2>
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
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              maxWidth: '1400px',
              margin: '0 auto',
              justifyContent: 'center'
            }}>
              {speakers.map((speaker, index) => (
                <div
                  key={speaker.id || index}
                  className="m-speakers-list__items__item__container"
                  style={{
                    width: '240px',
                    background: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(39,67,56,0.10)',
                    border: '1px solid rgba(39,67,56,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(39,67,56,0.16)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 16px rgba(39,67,56,0.10)';
                  }}
                >
                  {/* Image wrapper */}
                  <div className="m-speakers-list__items__item__wrapper-one">
                    <div
                      className="m-speakers-list__items__item__image"
                      style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: '#274338' }}
                    >
                      {speaker.photo ? (
                        <img
                          className="m-speakers-list__items__item__image__image u-shape-square u-width-100"
                          src={speaker.photo}
                          alt={`Speaker profile image for ${speaker.name}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/240x240/274338/ffffff?text=${speaker.name?.charAt(0) || 'S'}`;
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <MdRecordVoiceOver size={64} style={{ color: '#ffffff' }} />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Text content */}
                  <div
                    className="m-speakers-list__items__item__wrapper-two"
                    style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}
                  >
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a2d26', marginBottom: '4px', lineHeight: 1.3 }}>
                      {speaker.name}
                    </h3>
                    <div style={{ fontSize: '0.88rem', color: '#444', lineHeight: 1.4 }}>
                      {speaker.designation || speaker.role}{(speaker.designation || speaker.role) && speaker.affiliation ? ', ' : ''}{speaker.affiliation}
                    </div>
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
