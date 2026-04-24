import React, { useState } from 'react';
import { useConference } from '../context/ConferenceContext';

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const { importantDetails } = useConference();

  // Get conference dates from API or fallback
  // Strip HTML tags (API may return <br> tags)
  const conferenceDates = importantDetails?.ConferenceDates
    ? importantDetails.ConferenceDates.replace(/<[^>]*>/g, '')
    : 'March 15-16, 2027';
  const conferenceVenue = importantDetails?.ConferenceVenue
    ? importantDetails.ConferenceVenue.replace(/<[^>]*>/g, '')
    : 'Bangalore, India';

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
            Event Schedule
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

      {/* Schedule Content */}
      <section style={{ 
        padding: '80px 0', 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          {/* Day Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            marginBottom: '50px',
            justifyContent: 'center'
          }}>
            <button 
              onClick={() => setSelectedDay(1)}
              style={{
                background: selectedDay === 1 ? '#274338' : 'white',
                border: selectedDay === 1 ? 'none' : '2px solid #274338',
                padding: '15px 40px',
                borderRadius: '12px',
                color: selectedDay === 1 ? 'white' : '#274338',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: selectedDay === 1 ? '0 4px 20px rgba(39, 67, 56, 0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}>
              Day 1
            </button>
            <button 
              onClick={() => setSelectedDay(2)}
              style={{
                background: selectedDay === 2 ? '#274338' : 'white',
                border: selectedDay === 2 ? 'none' : '2px solid #274338',
                padding: '15px 40px',
                borderRadius: '12px',
                color: selectedDay === 2 ? 'white' : '#274338',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: selectedDay === 2 ? '0 4px 20px rgba(39, 67, 56, 0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}>
              Day 2
            </button>
            <button 
              onClick={() => setSelectedDay(3)}
              style={{
                background: selectedDay === 3 ? '#274338' : 'white',
                border: selectedDay === 3 ? 'none' : '2px solid #274338',
                padding: '15px 40px',
                borderRadius: '12px',
                color: selectedDay === 3 ? 'white' : '#274338',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: selectedDay === 3 ? '0 4px 20px rgba(39, 67, 56, 0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}>
              Day 3
            </button>
          </div>

          {/* Schedule Content */}
          <div style={{ 
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Day 1 Schedule */}
            {selectedDay === 1 && (
              <>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#274338', marginBottom: '8px' }}>
                    Opening Day
                  </h3>
                  <p style={{ fontSize: '1rem', color: '#666', marginBottom: '20px' }}>
                    October 13, 2026
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    { time: '08:00 AM - 09:00 AM', title: 'Registration & Welcome Coffee', color: '#274338' },
                    { time: '09:00 AM - 09:30 AM', title: 'Opening Ceremony & Welcome Remarks', color: '#3d5a4f' },
                    { time: '09:30 AM - 10:30 AM', title: 'Keynote Session 1: Future of Materials Science', color: '#3498db' },
                    { time: '10:30 AM - 11:00 AM', title: 'Coffee Break & Networking', color: '#95a5a6' },
                    { time: '11:00 AM - 12:30 PM', title: 'Parallel Technical Sessions (Track 1-4)', color: '#274338' },
                    { time: '12:30 PM - 02:00 PM', title: 'Lunch & Poster Session', color: '#e67e22' },
                    { time: '02:00 PM - 03:30 PM', title: 'Parallel Technical Sessions (Track 5-8)', color: '#274338' },
                    { time: '03:30 PM - 04:00 PM', title: 'Afternoon Tea Break', color: '#95a5a6' },
                    { time: '04:00 PM - 05:30 PM', title: 'Panel Discussion: Industry-Academia Collaboration', color: '#3498db' },
                    { time: '07:00 PM - 09:00 PM', title: 'Welcome Reception & Dinner', color: '#e74c3c' }
                  ].map((event, index) => (
                    <div key={index} style={{
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      padding: '20px',
                      borderLeft: `4px solid ${event.color}`,
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        minWidth: '180px',
                        fontWeight: '600',
                        color: '#274338',
                        fontSize: '0.95rem'
                      }}>
                        {event.time}
                      </div>
                      <div style={{
                        flex: 1,
                        fontSize: '1rem',
                        color: '#333'
                      }}>
                        {event.title}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Day 2 Schedule */}
            {selectedDay === 2 && (
              <>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#274338', marginBottom: '8px' }}>
                    Technical Sessions Day
                  </h3>
                  <p style={{ fontSize: '1rem', color: '#666', marginBottom: '20px' }}>
                    October 14, 2026
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    { time: '08:30 AM - 09:00 AM', title: 'Registration & Morning Coffee', color: '#274338' },
                    { time: '09:00 AM - 10:00 AM', title: 'Keynote Session 2: Sustainable Materials', color: '#3498db' },
                    { time: '10:00 AM - 10:30 AM', title: 'Coffee Break', color: '#95a5a6' },
                    { time: '10:30 AM - 12:00 PM', title: 'Parallel Technical Sessions (Track 9-12)', color: '#274338' },
                    { time: '12:00 PM - 01:30 PM', title: 'Lunch & Exhibition Tour', color: '#e67e22' },
                    { time: '01:30 PM - 03:00 PM', title: 'Workshop: AI in Materials Discovery', color: '#9b59b6' },
                    { time: '03:00 PM - 03:30 PM', title: 'Afternoon Tea Break', color: '#95a5a6' },
                    { time: '03:30 PM - 05:00 PM', title: 'Young Researchers Forum', color: '#3498db' },
                    { time: '07:00 PM - 10:00 PM', title: 'Conference Gala Dinner', color: '#e74c3c' }
                  ].map((event, index) => (
                    <div key={index} style={{
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      padding: '20px',
                      borderLeft: `4px solid ${event.color}`,
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        minWidth: '180px',
                        fontWeight: '600',
                        color: '#274338',
                        fontSize: '0.95rem'
                      }}>
                        {event.time}
                      </div>
                      <div style={{
                        flex: 1,
                        fontSize: '1rem',
                        color: '#333'
                      }}>
                        {event.title}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Day 3 Schedule */}
            {selectedDay === 3 && (
              <>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#274338', marginBottom: '8px' }}>
                    Closing Day
                  </h3>
                  <p style={{ fontSize: '1rem', color: '#666', marginBottom: '20px' }}>
                    October 15, 2026
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {[
                    { time: '08:30 AM - 09:00 AM', title: 'Registration & Morning Coffee', color: '#274338' },
                    { time: '09:00 AM - 10:00 AM', title: 'Keynote Session 3: Materials for Clean Energy', color: '#3498db' },
                    { time: '10:00 AM - 10:30 AM', title: 'Coffee Break', color: '#95a5a6' },
                    { time: '10:30 AM - 12:00 PM', title: 'Final Technical Sessions', color: '#274338' },
                    { time: '12:00 PM - 01:00 PM', title: 'Lunch', color: '#e67e22' },
                    { time: '01:00 PM - 02:30 PM', title: 'Best Paper Awards & Closing Ceremony', color: '#3498db' },
                    { time: '02:30 PM', title: 'Conference Concludes', color: '#274338' }
                  ].map((event, index) => (
                    <div key={index} style={{
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      padding: '20px',
                      borderLeft: `4px solid ${event.color}`,
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        minWidth: '180px',
                        fontWeight: '600',
                        color: '#274338',
                        fontSize: '0.95rem'
                      }}>
                        {event.time}
                      </div>
                      <div style={{
                        flex: 1,
                        fontSize: '1rem',
                        color: '#333'
                      }}>
                        {event.title}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
