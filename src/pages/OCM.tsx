import React, { useEffect, useState } from 'react';
import { useConference } from '../context/ConferenceContext';
import { getMembersByUser } from '../services/api';

interface CommitteeMember {
  id: number;
  name: string;
  affiliation: string;
  photo: string;
  speaker_category?: string;
  category?: string;
  designation?: string;
  role?: string;
  specialty?: string;
}

const OCM: React.FC = () => {
  const { loginDetails, importantDetails } = useConference();
  // Strip HTML tags (API may return <br> tags)
  const conferenceVenue = importantDetails?.ConferenceVenue
    ? importantDetails.ConferenceVenue.replace(/<[^>]*>/g, '')
    : 'Conference Venue';
  const conferenceDates = importantDetails?.ConferenceDates
    ? importantDetails.ConferenceDates.replace(/<[^>]*>/g, '')
    : 'March 15-16, 2027';
  
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>(() => {
    // Initialize with cached data for instant display
    try {
      const cached = localStorage.getItem('conferenceSpeakers');
      const allMembers = cached ? JSON.parse(cached) : [];
      return allMembers.filter((m: CommitteeMember) =>
        m.category?.toLowerCase() === 'ocm' || m.speaker_category?.toLowerCase() === 'ocm'
      );
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadOCM = async (username: string) => {
      try {
        setLoading(true);
        console.log('OCM: Fetching members for username:', username);
        const allData = await getMembersByUser(username);
        console.log('OCM: All members data received:', allData);

        // Filter OCM members only
        const ocmMembers = (allData || []).filter(
          (member: CommitteeMember) => 
            member.category?.toLowerCase() === 'ocm' || 
            member.speaker_category?.toLowerCase() === 'ocm'
        );

        setCommitteeMembers(ocmMembers);
        // Data is already cached by Speakers page
      } catch (error) {
        console.error('Failed to fetch OCM members:', error);
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
              await loadOCM(parsed.username);
              return;
            }
          }
        } catch (e) {
          console.error('Failed to get cached username:', e);
        }
        setLoading(false);
        return;
      }

      await loadOCM(username);
    };

    fetchData();
  }, [loginDetails?.username]);

  // Fallback committee members for display when API data is not available
  const fallbackMembers = {
    organizing: [
      { name: 'Prof. Dr. Hans Mueller', affiliation: 'University of Bern, Switzerland', role: 'Conference Chair' },
      { name: 'Dr. Emma Williams', affiliation: 'ETH Zurich, Switzerland', role: 'Program Chair' },
      { name: 'Prof. Michael Zhang', affiliation: 'EPFL, Switzerland', role: 'Technical Chair' },
      { name: 'Dr. Sophie Laurent', affiliation: 'University of Geneva, Switzerland', role: 'Publication Chair' }
    ],
    technical: [
      { name: 'Prof. Robert Johnson', affiliation: 'MIT, USA', specialty: 'Nanomaterials' },
      { name: 'Dr. Li Wei', affiliation: 'Tsinghua University, China', specialty: 'Energy Materials' },
      { name: 'Prof. Maria Garcia', affiliation: 'University of Barcelona, Spain', specialty: 'Biomaterials' },
      { name: 'Dr. Ahmed Hassan', affiliation: 'Cairo University, Egypt', specialty: 'Computational Materials' },
      { name: 'Prof. Yuki Tanaka', affiliation: 'University of Tokyo, Japan', specialty: 'Polymer Science' },
      { name: 'Dr. Anna Kowalski', affiliation: 'University of Warsaw, Poland', specialty: 'Advanced Alloys' }
    ],
    advisory: [
      { name: 'Prof. Dr. John Smith', affiliation: 'Cambridge University, UK' },
      { name: 'Prof. Jennifer Lee', affiliation: 'Stanford University, USA' },
      { name: 'Dr. Carlos Rodriguez', affiliation: 'University of São Paulo, Brazil' },
      { name: 'Prof. Fatima Al-Rashid', affiliation: 'King Abdullah University, Saudi Arabia' }
    ]
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
            Organizing Committee
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

      {/* Committee Sections */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {loading && committeeMembers.length === 0 && (
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
              <p style={{ marginTop: '20px', color: '#666' }}>Loading committee members...</p>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}} />
            </div>
          )}

          {!loading && committeeMembers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>
                Committee information will be available soon.
              </p>
            </div>
          )}

          {committeeMembers.length > 0 && (
            <>
              {/* Organizing Committee Members */}
              <div style={{ marginBottom: '80px' }}>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '600',
                  color: '#274338',
                  marginBottom: '40px',
                  textAlign: 'center',
                  paddingBottom: '15px',
                  borderBottom: '3px solid #274338'
                }}>
                  Organizing Committee Members
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '30px'
                }}>
                  {committeeMembers.map((member, index) => (
                    <div key={member.id || index} style={{
                      background: 'white',
                      padding: '30px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                    }}>
                      {member.photo && (
                        <div style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          margin: '0 auto 20px',
                          background: '#274338'
                        }}>
                          <img
                            src={member.photo}
                            alt={member.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      {(member.role || member.designation) && (
                        <div style={{
                          background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          display: 'inline-block',
                          marginBottom: '15px'
                        }}>
                          {member.role || member.designation}
                        </div>
                      )}
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: '10px'
                      }}>
                        {member.name}
                      </h3>
                      {member.affiliation && (
                        <p style={{
                          fontSize: '0.95rem',
                          color: '#666',
                          lineHeight: '1.6'
                        }}>
                          {member.affiliation}
                        </p>
                      )}
                      {member.specialty && (
                        <p style={{
                          fontSize: '0.85rem',
                          color: '#888',
                          fontStyle: 'italic',
                          marginTop: '8px'
                        }}>
                          Specialty: {member.specialty}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Display fallback members only if no API data is loaded */}
          {!loading && committeeMembers.length === 0 && fallbackMembers && (
            <>
          {/* Organizing Committee */}
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#274338',
              marginBottom: '40px',
              textAlign: 'center',
              paddingBottom: '15px',
              borderBottom: '3px solid #274338'
            }}>
              Organizing Committee
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {fallbackMembers.organizing.map((member: any, index: number) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    display: 'inline-block',
                    marginBottom: '15px'
                  }}>
                    {member.role}
                  </div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#666',
                    lineHeight: '1.6'
                  }}>
                    {member.affiliation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Program Committee */}
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#274338',
              marginBottom: '40px',
              textAlign: 'center',
              paddingBottom: '15px',
              borderBottom: '3px solid #274338'
            }}>
              Technical Program Committee
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '25px'
            }}>
              {fallbackMembers.technical.map((member: any, index: number) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  borderLeft: '4px solid #3498db'
                }}>
                  <h4 style={{
                    fontSize: '1.15rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    {member.name}
                  </h4>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    marginBottom: '8px'
                  }}>
                    {member.affiliation}
                  </p>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#888',
                    fontStyle: 'italic'
                  }}>
                    Specialty: {member.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Advisory Board */}
          <div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#274338',
              marginBottom: '40px',
              textAlign: 'center',
              paddingBottom: '15px',
              borderBottom: '3px solid #274338'
            }}>
              Advisory Board
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px'
            }}>
              {fallbackMembers.advisory.map((member: any, index: number) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  borderLeft: '4px solid #e67e22'
                }}>
                  <h4 style={{
                    fontSize: '1.15rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    {member.name}
                  </h4>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    {member.affiliation}
                  </p>
                </div>
              ))}
            </div>
          </div>
          </>
          )}
        </div>
      </section>
    </div>
  );
};

export default OCM;
