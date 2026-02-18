import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useConference } from '../context/ConferenceContext';
import { getMembersByUser } from '../services/api';
import heroBg from '../assets/hero-bg.jpg';
import conferenceImg from '../assets/Conferenec_img01.png';
import confImg1 from '../assets/Conferenec_img02.png';
import confImg2 from '../assets/Conferenec_img03.png';
import confImg3 from '../assets/Conferenec_img04.png';
import confImg4 from '../assets/Conferenec_img05.png';
import '../css/vendorc619.css';
import '../css/mainc09f.css';
import '../css/devstyles43e1.css';
import { 
  MdScience, 
  MdBuild, 
  MdBolt, 
  MdMemory, 
  MdSearch, 
  MdLocalHospital, 
  MdBusiness,
  MdRecordVoiceOver,
  MdEmail,
  MdSchool,
  MdGroups,
  MdStarRate
} from 'react-icons/md';

interface StatisticItem {
  value: number;
  label: string;
}

interface TrackItem {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  topics: string[];
}

interface Speaker {
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

const Home: React.FC = () => {
  const { importantDetails } = useConference();
  
  // Get conference details from API or fallback
  // Strip HTML tags from title (API may return <br> tags)
  const conferenceTitle = importantDetails?.ConferenceTitle 
    ? importantDetails.ConferenceTitle.replace(/<[^>]*>/g, '')
    : 'International Conference on Advanced Materials Science and Engineering 2027';
  const conferenceDates = importantDetails?.ConferenceDates || 'March 15-16, 2027';
  const conferenceVenue = importantDetails?.ConferenceVenue || 'Bangalore, India';
  // Disable right-click context menu on the home page
useEffect(() => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };
  document.addEventListener('contextmenu', handleContextMenu);
  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
  };
}, []);
  // Parse conference dates for schedule display
  const parseConferenceDatesForSchedule = (dateString: string) => {
    try {
      // Handle format like "March 15-16, 2027" or "March 15, 2027"
      const rangeMatch = dateString.match(/^(\w+)\s+(\d+)-(\d+),\s+(\d+)$/);
      const singleMatch = dateString.match(/^(\w+)\s+(\d+),\s+(\d+)$/);

      if (rangeMatch) {
        const [, month, startDay, endDay, year] = rangeMatch;
        return {
          day1: `${month} ${startDay}`,
          day2: `${month} ${parseInt(startDay) + 1}`,
          day3: `${month} ${endDay}`,
          fullDate: dateString
        };
      } else if (singleMatch) {
        const [, month, day, year] = singleMatch;
        return {
          day1: `${month} ${day}`,
          day2: `${month} ${parseInt(day) + 1}`,
          day3: `${month} ${parseInt(day) + 2}`,
          fullDate: dateString
        };
      }
    } catch (error) {
      console.error('Error parsing dates:', error);
    }
    
    // Fallback
    return {
      day1: 'March 15',
      day2: 'March 16',
      day3: 'March 17',
      fullDate: conferenceDates
    };
  };
  
  const scheduleInfo = parseConferenceDatesForSchedule(conferenceDates);
  
  // Load Google Maps API on component mount
  useEffect(() => {
    const loadGoogleMapsAPI = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBd8DJQdb77Nn63sqpAM0Orj3aIJCUTkQE&callback=initMap';
        script.async = true;
        script.defer = true;
        
        (window as any).initMap = () => {
          console.log('Google Maps API loaded');
        };
        
        script.onerror = () => {
          console.error('Failed to load Google Maps API');
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    loadGoogleMapsAPI();
  }, []);

  // Counter animation for statistics
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      const duration = 2000; // 2 seconds

      counters.forEach((counter: Element) => {
        const target = parseInt((counter as HTMLElement).getAttribute('data-target') || '0');
        const increment = target / (duration / 16); // 60fps
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

    // Delay to ensure DOM is ready
    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch speakers from API
  useEffect(() => {
    const loadSpeakers = async (username: string) => {
      try {
        setSpeakersLoading(true);
        console.log('Home: Fetching speakers for username:', username);
        const allData = await getMembersByUser(username);
        console.log('Home: All members data received:', allData);

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
        setSpeakersLoading(false);
      }
    };

    const fetchData = async () => {
      const username = importantDetails?.username || localStorage.getItem('conferenceUsername');
      
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
        setSpeakersLoading(false);
        return;
      }

      await loadSpeakers(username);
    };

    fetchData();
  }, [importantDetails?.username]);

  // State for selected day in Event Schedule
  const [selectedDay, setSelectedDay] = useState(1);

  // State for speakers
  const [speakers, setSpeakers] = useState<Speaker[]>(() => {
    // Initialize with cached data for instant display
    try {
      const cached = localStorage.getItem('conferenceSpeakers');
      const allMembers = cached ? JSON.parse(cached) : [];
      // Show all members except OCM
      return allMembers.filter((m: Speaker) =>
        m.category?.toLowerCase() !== 'ocm' && m.speaker_category?.toLowerCase() !== 'ocm'
      );
    } catch {
      return [];
    }
  });
  const [speakersLoading, setSpeakersLoading] = useState<boolean>(false);

  // Banner statistics
  const statistics: StatisticItem[] = [
    { value: 300, label: 'Attendees' },
    { value: 50, label: 'Exhibitors' },
    { value: 40, label: 'Speakers' },
    { value: 15, label: 'Sessions ' },
    { value: 40, label: 'Countries' },
  ];

  // Conference contact emails
  const contactEmails = [
    'secretary@icamse2027.com',
    'contact@icamse2027.com',
    'info@icamse2027.com',
  ];

  // Scientific Themes & Tracks
  const scientificTracks: TrackItem[] = [
    {
      title: 'Advanced & Functional Materials',
      icon: MdScience,
      topics: [
        'Nanomaterials and nanostructured materials',
        'Smart and responsive materials',
        'Metamaterials and photonic materials',
        'Functional polymers and composites',
      ],
    },
    {
      title: 'Materials Processing & Manufacturing',
      icon: MdBuild,
      topics: [
        'Additive manufacturing (3D/4D printing)',
        'Advanced forming and joining techniques',
        'Powder metallurgy and sintering',
        'Surface engineering and coatings',
      ],
    },
    {
      title: 'Energy & Sustainable Materials',
      icon: MdBolt,
      topics: [
        'Materials for batteries and supercapacitors',
        'Hydrogen storage and fuel cell materials',
        'Solar and photovoltaic materials',
        'Sustainable, recyclable, and green materials',
        'Circular economy in materials science',
      ],
    },
    {
      title: 'Computational & AI-Driven Materials Science',
      icon: MdMemory,
      topics: [
        'Materials informatics',
        'Machine learning for materials discovery',
        'Multiscale modeling and simulations',
        'Digital twins and predictive materials design',
      ],
    },
    {
      title: 'Characterization & Testing Techniques',
      icon: MdSearch,
      topics: [
        'Electron microscopy and spectroscopy',
        'XRD, AFM, STM techniques',
        'Mechanical, thermal, and electrical characterization',
        'In-situ and operando analysis',
      ],
    },
    {
      title: 'Biomaterials & Healthcare Applications',
      icon: MdLocalHospital,
      topics: [
        'Biomaterials and tissue engineering',
        'Drug delivery systems',
        'Medical implants and prosthetic materials',
        'Polymers for biomedical applications',
      ],
    },
    {
      title: 'Structural & Industrial Materials',
      icon: MdBusiness,
      topics: [
        'Advanced alloys and composites',
        'Aerospace and automotive materials',
        'Construction and cementitious materials',
        'Corrosion, degradation, and failure analysis',
      ],
    },
    {
      title: 'Smart Coatings & Surface Engineering',
      icon: MdBuild,
      topics: [
        'Self-healing coatings',
        'Anti-corrosion and anti-fouling surfaces',
        'Functional thin films',
        'Surface modification for biomedical devices',
      ],
    },
    {
      title: 'Polymer Science & Engineering',
      icon: MdScience,
      topics: [
        'Polymer synthesis and characterization',
        'Biodegradable and sustainable polymers',
        'Polymer nanocomposites',
        'Polymers in electronics and photonics',
      ],
    },
    {
      title: 'Materials for Electronics & Photonics',
      icon: MdBolt,
      topics: [
        'Semiconductor materials',
        'Optoelectronic materials',
        'Flexible and wearable electronics',
        'Quantum materials',
      ],
    },
    {
      title: 'Environmental & Green Materials',
      icon: MdSearch,
      topics: [
        'Materials for water purification',
        'Air filtration and pollution control',
        'Green synthesis and processing',
        'Life cycle analysis of materials',
      ],
    },
    {
      title: 'Materials Education & Outreach',
      icon: MdMemory,
      topics: [
        'STEM education in materials science',
        'Public engagement and science communication',
        'Diversity and inclusion in materials research',
        'International collaboration and exchange',
      ],
    },
  ];

  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-N6GC5CW"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>

      <main style={{ paddingTop: '160px' }}>
        {/* Banner Section */}
        <section className="component__banner banner">
          <div className="swiper banner__slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide banner__slider-slide">
                <div className="banner__bg-wrap">
                  <img
                    src={heroBg}
                    className="banner__bg"
                    alt="Americas LNG Home Page Banner"
                  />
                </div>
                <div className="container banner__container">
                  <div className="banner__content">
                    <div className="banner__content-text">
                      <div className="animated__text">
                        <h2 style={{ fontSize: '4rem', fontWeight: '700', color: '#fff', lineHeight: 1.2, textShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                          {conferenceTitle}
                        </h2>
                      </div>
                      <div className="btn-wrap">
                        <div className="btn-theme-3">
                          <a href="/registration" className="button__primary">
                          Register Now
                          </a>
                        </div>
                        <div className="btn-theme-5">
                          <a href="/submit-abstract" className="button__primary">
                          Submit Abstract
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Banner Statistics */}
                  <div className="statistics banner__statistics">
                    <div className="statistics__col-wrap">
                      <div className="swiper statistics-slider__swiper1">
                        <div className="swiper-wrapper">
                          {statistics.map((stat) => (
                            <div key={stat.label} className="swiper-slide">
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
              </div>
            </div>
            <div className="swiper-pagination" />
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="umb-block-grid" style={{ 
          '--umb-block-grid--grid-columns': '12',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          paddingTop: '40px',
          paddingBottom: '60px',
          position: 'relative',
          zIndex: 1
        } as React.CSSProperties}>
          <div className="umb-block-grid__layout-container">
            {/* Two Column Section */}
            <div
              className="umb-block-grid__layout-item"
              style={{ '--umb-block-grid--item-column-span': '12', '--umb-block-grid--item-row-span': '1' } as React.CSSProperties}
            >
              <div>
                <div className="umb-block-grid__area-container">
                  <div
                    className="umb-block-grid__area"
                    style={{ '--umb-block-grid--grid-columns': '12', '--umb-block-grid--area-column-span': '12', '--umb-block-grid--area-row-span': '1' } as React.CSSProperties}
                  >
                    <div className="umb-block-grid__layout-container">
                      <div
                        className="umb-block-grid__layout-item"
                        style={{ '--umb-block-grid--item-column-span': '12', '--umb-block-grid--item-row-span': '1' } as React.CSSProperties}
                      >
                        <section className="two-col-block">
                          <div className="container">
                            <div className="two-col-wrapper">
                              <div className="two-col-content">
                               
                             <h2>

                                    About the Conference
                                  </h2>
                                  <p>
                                    {conferenceTitle} aims to bring together leading scientists, engineers, academicians, industry professionals, and young researchers from around the world to exchange the latest advances, innovations, and challenges in materials science.
                                  </p>
                                  <p>
                                    The conference will serve as a premier interdisciplinary platform to present cutting-edge research on the design, synthesis, characterization, processing, and application of advanced materials across energy, healthcare, electronics, manufacturing, and sustainability sectors.
                                  </p>
                                  <p>
                                    The event offers a unique opportunity to foster global collaborations in a high-quality academic and industrial environment.
                                  </p>

                                {/* Content Statistics */}
                                <div className="statistics">
                                  <div className="statistics__col-wrap">
                                    <div className="swiper statistics-slider__swiper1">
                                      <div className="swiper-wrapper">
                                        {statistics.filter(stat => stat.label !== 'Countries').map((stat) => (
                                          <div key={`content-${stat.label}`} className="swiper-slide">
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

                                {/* Content CTA Buttons */}
                                <div className="btn-wrap">
                                  <div className="btn-theme-4">
                                    {/* <a href="forms/download-event-brochure/index.html" target="_blank" rel="noopener noreferrer">
                                      EVENT BROCHURE
                                    </a> */}
                                  </div>
                                  <div className="btn-theme-4">
                                    <a href="/registration" target="_blank" rel="noopener noreferrer">
                                      REGISTER NOW
                                    </a>
                                  </div>
                                  <div className="btn-theme-4">
                                    <a href="/submit-abstract" target="_blank" rel="noopener noreferrer">
                                      SUBMIT ABSTRACT
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* Conference Image */}
                              <div className="two-col-media">
                                <img 
                                  src={conferenceImg} 
                                  alt={conferenceTitle} 
                                  style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                                    objectFit: 'cover'
                                  }}
                                  draggable={false}
                                  onContextMenu={e => e.preventDefault()}
                                />
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Speakers Section */}
                      <div className="umb-block-grid__layout-item">
                        <section style={{ padding: '80px 0', background: '#f7fafc' }}>
                          <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '14px' }}>
                                <MdRecordVoiceOver size={36} style={{ color: '#274338' }} />
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1a2d26', letterSpacing: '-0.5px', margin: 0 }}>
                                  Speakers
                                </h2>
                              </div>
                              <p style={{ color: '#4a5568', fontSize: '1.12rem', maxWidth: 700, margin: '0 auto', fontWeight: 400, lineHeight: 1.7 }}>
                                Learn from world-renowned experts sharing cutting-edge research and insights in materials science and engineering.
                              </p>
                            </div>

                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(5, 1fr)',
                              gap: '24px',
                              marginTop: '40px'
                            }}>
                              {speakersLoading && speakers.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
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

                              {!speakersLoading && speakers.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
                                  <p style={{ fontSize: '1.2rem', color: '#666' }}>
                                    Speakers information will be available soon.
                                  </p>
                                </div>
                              )}

                              {speakers.length > 0 && speakers.map((speaker, index) => (
                                <div
                                  key={speaker.id || index}
                                  style={{
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                                    borderRadius: '16px',
                                    padding: '24px 16px',
                                    boxShadow: '0 2px 16px rgba(39,67,56,0.09)',
                                    border: '1px solid rgba(39,67,56,0.08)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(39,67,56,0.12)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 16px rgba(39,67,56,0.09)';
                                  }}
                                >
                                  <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginBottom: '20px',
                                    boxShadow: '0 4px 12px rgba(39,67,56,0.2)',
                                    background: '#274338'
                                  }}>
                                    {speaker.photo ? (
                                      <img
                                        src={speaker.photo}
                                        alt={speaker.name}
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/100x100/274338/ffffff?text=${speaker.name?.charAt(0) || 'S'}`;
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
                                        <MdRecordVoiceOver size={48} style={{ color: '#ffffff' }} />
                                      </div>
                                    )}
                                  </div>
                                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1a2d26', marginBottom: '6px' }}>
                                    {speaker.name}
                                  </h3>
                                  <div style={{ fontSize: '0.95rem', color: '#274338', fontWeight: 500, marginBottom: '8px' }}>
                                    {speaker.designation || speaker.role  }
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>
                                    <MdSchool size={16} />
                                    <span>{speaker.affiliation}</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: '#666' }}>
                                    <MdGroups size={16} />
                                    <span>{speaker.speaker_category || speaker.category || 'Speaker'}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Conference Objectives Section - Enhanced */}
                      <div className="umb-block-grid__layout-item">
                        <section style={{ padding: '80px 0', background: '#f7fafc' }}>
                          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1a2d26', marginBottom: '14px', letterSpacing: '-0.5px' }}>
                                Conference Objectives
                              </h2>
                              <p style={{ color: '#4a5568', fontSize: '1.12rem', maxWidth: 700, margin: '0 auto', fontWeight: 400, lineHeight: 1.7 }}>
                                ICAMSE 2027 is dedicated to advancing the field of materials science and engineering by fostering innovation, collaboration, and global knowledge exchange. Our objectives are designed to empower researchers, professionals, and students to shape the future of technology and sustainability.
                              </p>
                            </div>
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(4, 1fr)',
                              gap: '36px',
                              marginTop: '32px',
                            }}>
                              {/* Objective 1 */}
                              <div style={{
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 2px 16px rgba(39,67,56,0.09)',
                                padding: '38px 28px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                minHeight: 210,
                                border: '1px solid rgba(39,67,56,0.07)'
                              }}>
                                <div style={{ fontSize: '2.2rem', color: '#274338', marginBottom: 18, opacity: 0.85 }}><MdScience size={36} /></div>
                                <h3 style={{ color: '#1a2d26', fontWeight: 600, fontSize: '1.18rem', marginBottom: 10 }}>Advance Scientific Knowledge</h3>
                                <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
                                  Showcase and disseminate the latest breakthroughs in materials science, engineering, and technology.
                                </p>
                              </div>
                              {/* Objective 2 */}
                              <div style={{
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 2px 16px rgba(39,67,56,0.09)',
                                padding: '38px 28px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                minHeight: 210,
                                border: '1px solid rgba(39,67,56,0.07)'
                              }}>
                                <div style={{ fontSize: '2.2rem', color: '#274338', marginBottom: 18, opacity: 0.85 }}><MdBusiness size={36} /></div>
                                <h3 style={{ color: '#1a2d26', fontWeight: 600, fontSize: '1.18rem', marginBottom: 10 }}>Foster Global Collaboration</h3>
                                <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
                                  Connect academia, industry, and government to drive interdisciplinary partnerships and impactful solutions.
                                </p>
                              </div>
                              {/* Objective 3 */}
                              <div style={{
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 2px 16px rgba(39,67,56,0.09)',
                                padding: '38px 28px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                minHeight: 210,
                                border: '1px solid rgba(39,67,56,0.07)'
                              }}>
                                <div style={{ fontSize: '2.2rem', color: '#274338', marginBottom: 18, opacity: 0.85 }}><MdBolt size={36} /></div>
                                <h3 style={{ color: '#1a2d26', fontWeight: 600, fontSize: '1.18rem', marginBottom: 10 }}>Promote Sustainable Solutions</h3>
                                <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
                                  Address global challenges by promoting green, circular, and innovative materials and processes.
                                </p>
                              </div>
                              {/* Objective 4 */}
                              <div style={{
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 2px 16px rgba(39,67,56,0.09)',
                                padding: '38px 28px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                minHeight: 210,
                                border: '1px solid rgba(39,67,56,0.07)'
                              }}>
                                <div style={{ fontSize: '2.2rem', color: '#274338', marginBottom: 18, opacity: 0.85 }}><MdLocalHospital size={36} /></div>
                                <h3 style={{ color: '#1a2d26', fontWeight: 600, fontSize: '1.18rem', marginBottom: 10 }}>Inspire the Next Generation</h3>
                                <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
                                  Empower young scientists and students through mentorship, networking, and educational opportunities.
                                </p>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Scientific Themes & Tracks Section */}
                      <div className="umb-block-grid__layout-item">
                        <section style={{ padding: '90px 0 100px', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)', position: 'relative' }}>
                          {/* Decorative background elements */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(39,67,56,0.03) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            pointerEvents: 'none'
                          }}></div>

                          <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
                            {/* Section Header */}
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                              <div style={{
                                display: 'inline-block',
                                padding: '8px 24px',
                                background: 'linear-gradient(135deg, rgba(39,67,56,0.08) 0%, rgba(39,67,56,0.12) 100%)',
                                borderRadius: '30px',
                                marginBottom: '20px',
                                border: '1px solid rgba(39,67,56,0.15)'
                              }}>
                                <span style={{
                                  fontSize: '0.85rem',
                                  fontWeight: 600,
                                  color: '#274338',
                                  letterSpacing: '1.5px',
                                  textTransform: 'uppercase'
                                }}>Conference Tracks</span>
                              </div>

                              <h2 style={{ 
                                fontSize: '2.8rem', 
                                fontWeight: 800, 
                                color: '#1a2d26', 
                                marginBottom: '20px', 
                                letterSpacing: '-0.03em',
                                lineHeight: '1.15',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                              }}>
                                Scientific Themes & Research Tracks
                              </h2>
                              <p style={{ 
                                fontSize: '1.125rem', 
                                color: '#5a6c7d', 
                                maxWidth: '820px', 
                                margin: '0 auto 8px', 
                                fontWeight: 400,
                                lineHeight: '1.65',
                                letterSpacing: '0.005em',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                              }}>
                                Discover cutting-edge research across 12 specialized tracks covering the full spectrum of materials science and engineering
                              </p>
                              <p style={{
                                fontSize: '0.95rem',
                                color: '#718096',
                                fontWeight: 400,
                                fontStyle: 'italic'
                              }}>
                                Submit your abstract to any of the following tracks
                              </p>
                            </div>

                            {/* Tracks Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', marginTop: '50px' }}>
                              {scientificTracks.map((track, index) => (
                                <div
                                  key={index}
                                  style={{
                                    background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                                    borderRadius: '20px',
                                    padding: '40px 32px 36px',
                                    boxShadow: '0 2px 20px rgba(39, 67, 56, 0.08)',
                                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(39, 67, 56, 0.08)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(39, 67, 56, 0.15)';
                                    e.currentTarget.style.borderColor = 'rgba(39, 67, 56, 0.2)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 20px rgba(39, 67, 56, 0.08)';
                                    e.currentTarget.style.borderColor = 'rgba(39, 67, 56, 0.08)';
                                  }}
                                >
                                  {/* Track Number Badge */}
                                  <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(39,67,56,0.08) 0%, rgba(39,67,56,0.12) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    color: '#274338',
                                    border: '2px solid rgba(39,67,56,0.15)'
                                  }}>
                                    {String(index + 1).padStart(2, '0')}
                                  </div>

                                  {/* Icon */}
                                  <div style={{ 
                                    marginBottom: '24px', 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, rgba(39,67,56,0.08) 0%, rgba(39,67,56,0.05) 100%)',
                                    border: '1px solid rgba(39,67,56,0.12)',
                                    color: '#274338'
                                  }}>
                                    <track.icon size={32} />
                                  </div>

                                  {/* Title */}
                                  <h3 style={{ 
                                    fontSize: '1.3rem', 
                                    fontWeight: 700, 
                                    color: '#1a2d26', 
                                    marginBottom: '20px', 
                                    minHeight: '62px', 
                                    lineHeight: '1.4',
                                    letterSpacing: '-0.015em',
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                    paddingRight: '50px'
                                  }}>
                                    {track.title}
                                  </h3>

                                  {/* Divider */}
                                  <div style={{
                                    width: '40px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #274338 0%, rgba(39,67,56,0.3) 100%)',
                                    marginBottom: '20px',
                                    borderRadius: '2px'
                                  }}></div>

                                  {/* Topics List */}
                                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {track.topics.map((topic, topicIndex) => (
                                      <li
                                        key={topicIndex}
                                        style={{  
                                          fontSize: '0.94rem',
                                          color: '#5a6c7d',
                                          marginBottom: '12px',
                                          paddingLeft: '24px',
                                          position: 'relative',
                                          lineHeight: '1.55',
                                          fontWeight: 450,
                                          letterSpacing: '0.008em',
                                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                                        }}
                                      >
                                        <span
                                          style={{
                                            position: 'absolute',
                                            left: '0',
                                            top: '0.6rem',
                                            width: '8px',
                                            height: '8px',
                                            background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                                            borderRadius: '50%',
                                            opacity: 0.6,
                                            boxShadow: '0 2px 4px rgba(39,67,56,0.2)'
                                          }}
                                        />
                                        {topic}
                                      </li>
                                    ))}
                                  </ul>

                                  {/* Decorative corner accent */}
                                  <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '60px',
                                    height: '60px',
                                    background: 'linear-gradient(135deg, rgba(39,67,56,0.03) 0%, transparent 100%)',
                                    borderRadius: '0 60px 0 20px'
                                  }}></div>
                                </div>
                              ))}
                            </div>

                            {/* Call to Action */}
                            <div style={{
                              marginTop: '70px',
                              textAlign: 'center',
                              padding: '50px 40px',
                              background: 'linear-gradient(135deg, rgba(39,67,56,0.04) 0%, rgba(39,67,56,0.08) 100%)',
                              borderRadius: '24px',
                              border: '1px solid rgba(39,67,56,0.12)'
                            }}>
                              <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: 700,
                                color: '#1a2d26',
                                marginBottom: '16px',
                                letterSpacing: '-0.02em'
                              }}>
                                Don't See Your Research Area?
                              </h3>
                              <p style={{
                                fontSize: '1.05rem',
                                color: '#5a6c7d',
                                marginBottom: '28px',
                                maxWidth: '700px',
                                margin: '0 auto 28px',
                                lineHeight: '1.6'
                              }}>
                                We welcome interdisciplinary research that bridges multiple tracks. Contact our program committee for guidance on the best fit for your work.
                              </p>
                              <div style={{
                                display: 'flex',
                                gap: '16px',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                              }}>
                                <Link to="/submit-abstract" style={{
                                  padding: '14px 32px',
                                  background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '12px',
                                  fontSize: '1rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  boxShadow: '0 4px 12px rgba(39,67,56,0.25)',
                                  textDecoration: 'none',
                                  display: 'inline-block'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(39,67,56,0.35)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(39,67,56,0.25)';
                                }}
                                >
                                  Submit Your Abstract
                                </Link>
                                <Link to="/contact" style={{
                                  padding: '14px 32px',
                                  background: '#ffffff',
                                  color: '#274338',
                                  border: '2px solid #274338',
                                  borderRadius: '12px',
                                  fontSize: '1rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  textDecoration: 'none',
                                  display: 'inline-block'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#274338';
                                  e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#ffffff';
                                  e.currentTarget.style.color = '#274338';
                                }}
                                >
                                  Contact Program Committee
                                </Link>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Event Schedule Section - Enhanced */}
                      <div className="umb-block-grid__layout-item">
                        <section style={{ 
                          padding: '90px 0', 
                          background: 'linear-gradient(135deg, #1a2d26 0%, #274338 100%)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          {/* Decorative Background Pattern */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                            opacity: 0.4,
                            zIndex: 1
                          }}></div>

                          <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                            {/* Header */}
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                              <h2 style={{ 
                                fontSize: '2.8rem', 
                                fontWeight: 700, 
                                color: '#ffffff', 
                                marginBottom: '14px',
                                letterSpacing: '-0.5px'
                              }}>
                                Event Schedule
                              </h2>
                              <p style={{ 
                                fontSize: '1.15rem', 
                                color: 'rgba(255,255,255,0.88)', 
                                maxWidth: '650px', 
                                margin: '0 auto',
                                fontWeight: 400,
                                lineHeight: 1.6
                              }}>
                                Explore our comprehensive three-day conference program featuring keynotes, technical sessions, workshops, and networking events.
                              </p>
                              <div style={{
                                fontSize: '0.95rem',
                                color: 'rgba(255,255,255,0.75)',
                                marginTop: '10px',
                                fontWeight: 400
                              }}>
                                {scheduleInfo.fullDate}
                              </div>
                            </div>

                            {/* Day Tabs */}
                            <div style={{ 
                              display: 'flex', 
                              gap: '16px', 
                              marginBottom: '50px',
                              justifyContent: 'center',
                              flexWrap: 'wrap'
                            }}>
                              {[
                                { day: 1, label: 'Day 1', date: scheduleInfo.day1 },
                                { day: 2, label: 'Day 2', date: scheduleInfo.day2 },
                                { day: 3, label: 'Day 3', date: scheduleInfo.day3 }
                              ].map(({ day, label, date }) => (
                                <button
                                  key={day}
                                  onClick={() => setSelectedDay(day)}
                                  style={{
                                    background: selectedDay === day ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
                                    border: selectedDay === day ? 'none' : '1px solid rgba(255, 255, 255, 0.25)',
                                    padding: '14px 36px',
                                    borderRadius: '12px',
                                    color: selectedDay === day ? '#274338' : 'rgba(255, 255, 255, 0.9)',
                                    fontSize: '1.05rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: selectedDay === day ? '0 8px 24px rgba(255,255,255,0.2)' : 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                  }}
                                  onMouseEnter={(e) => {
                                    if (selectedDay !== day) {
                                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                                      e.currentTarget.style.transform = 'translateY(-3px)';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (selectedDay !== day) {
                                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                                      e.currentTarget.style.transform = 'translateY(0)';
                                    }
                                  }}
                                >
                                  <div style={{ fontSize: '1rem' }}>{label}</div>
                                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>{date}</div>
                                </button>
                              ))}
                            </div>

                            {/* Schedule Content */}
                            <div style={{ 
                              background: '#ffffff',
                              borderRadius: '20px',
                              padding: '48px 44px',
                              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
                              backdropFilter: 'blur(10px)'
                            }}>
                              {/* Day 1 Schedule */}
                              {selectedDay === 1 && (
                                <>
                                  <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{ 
                                      fontSize: '1.9rem', 
                                      fontWeight: 700, 
                                      color: '#1a2d26', 
                                      marginBottom: '6px' 
                                    }}>Opening Day</h3>
                                    <p style={{ 
                                      fontSize: '1.05rem', 
                                      color: '#666', 
                                      marginBottom: '0',
                                      fontWeight: 400
                                    }}>{scheduleInfo.day1}, {conferenceDates.match(/\d{4}$/)?.[0] || '2027'}</p>
                                    <div style={{ width: '60px', height: '3px', background: '#274338', marginTop: '12px', borderRadius: '2px' }}></div>
                                  </div>

                                  {/* Event List */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {/* Event 1 */}
                                <div style={{
                                  background: '#f8fafc',
                                  borderRadius: '14px',
                                  padding: '22px 24px',
                                  borderLeft: '4px solid #274338',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '24px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  border: '1px solid #f0f0f0',
                                  borderLeftWidth: '4px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f0f5f3';
                                  e.currentTarget.style.transform = 'translateX(8px)';
                                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8fafc';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                  <div style={{
                                    minWidth: '80px',
                                    fontFamily: 'monospace',
                                    fontSize: '1.2rem',
                                    color: '#274338',
                                    fontWeight: '600'
                                  }}>09:00</div>
                                  <div style={{ flex: 1 }}>
                                    <h4 style={{ 
                                      fontSize: '1.2rem', 
                                      fontWeight: '600', 
                                      color: '#2c3e50', 
                                      marginBottom: '5px' 
                                    }}>Registration & Welcome Coffee</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                      </svg>
                                      <span style={{ color: '#999', fontSize: '0.95rem' }}>Main Lobby</span>
                                    </div>
                                  </div>
                                  <div style={{
                                    padding: '6px 16px',
                                    background: '#e8f5f1',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    color: '#274338',
                                    fontWeight: '500'
                                  }}>Registration</div>
                                </div>

                                {/* Event 2 */}
                                <div style={{
                                  background: '#f8fafc',
                                  borderRadius: '14px',
                                  padding: '22px 24px',
                                  borderLeft: '4px solid #3d5a4f',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '24px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  border: '1px solid #f0f0f0',
                                  borderLeftWidth: '4px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f0f5f3';
                                  e.currentTarget.style.transform = 'translateX(8px)';
                                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8fafc';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                  <div style={{
                                    minWidth: '80px',
                                    fontFamily: 'monospace',
                                    fontSize: '1.2rem',
                                    color: '#3d5a4f',
                                    fontWeight: '600'
                                  }}>10:00</div>
                                  <div style={{ flex: 1 }}>
                                    <h4 style={{ 
                                      fontSize: '1.2rem', 
                                      fontWeight: '600', 
                                      color: '#2c3e50', 
                                      marginBottom: '5px' 
                                    }}>Opening Ceremony</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                      </svg>
                                      <span style={{ color: '#999', fontSize: '0.95rem' }}>Grand Auditorium</span>
                                    </div>
                                  </div>
                                  <div style={{
                                    padding: '6px 16px',
                                    background: '#e1ebe7',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    color: '#3d5a4f',
                                    fontWeight: '500'
                                  }}>Keynote</div>
                                </div>

                                {/* Event 3 */}
                                <div style={{
                                  background: '#f8fafc',
                                  borderRadius: '14px',
                                  padding: '22px 24px',
                                  borderLeft: '4px solid #3498db',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '24px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  border: '1px solid #f0f0f0',
                                  borderLeftWidth: '4px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f0f5f3';
                                  e.currentTarget.style.transform = 'translateX(8px)';
                                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8fafc';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                  <div style={{
                                    minWidth: '80px',
                                    fontFamily: 'monospace',
                                    fontSize: '1.2rem',
                                    color: '#3498db',
                                    fontWeight: '600'
                                  }}>11:30</div>
                                  <div style={{ flex: 1 }}>
                                    <h4 style={{ 
                                      fontSize: '1.2rem', 
                                      fontWeight: '600', 
                                      color: '#2c3e50', 
                                      marginBottom: '5px' 
                                    }}>Advanced Materials Revolution - Dr. Sarah Johnson</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                      </svg>
                                      <span style={{ color: '#999', fontSize: '0.95rem' }}>Grand Auditorium</span>
                                    </div>
                                  </div>
                                  <div style={{
                                    padding: '6px 16px',
                                    background: '#e3f2fd',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    color: '#3498db',
                                    fontWeight: '500'
                                  }}>Talk</div>
                                </div>

                                {/* Event 4 */}
                                <div style={{
                                  background: '#f8fafc',
                                  borderRadius: '14px',
                                  padding: '22px 24px',
                                  borderLeft: '4px solid #95a5a6',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '24px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  border: '1px solid #f0f0f0',
                                  borderLeftWidth: '4px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f0f5f3';
                                  e.currentTarget.style.transform = 'translateX(8px)';
                                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8fafc';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                  <div style={{
                                    minWidth: '80px',
                                    fontFamily: 'monospace',
                                    fontSize: '1.2rem',
                                    color: '#95a5a6',
                                    fontWeight: '600'
                                  }}>13:00</div>
                                  <div style={{ flex: 1 }}>
                                    <h4 style={{ 
                                      fontSize: '1.2rem', 
                                      fontWeight: '600', 
                                      color: '#2c3e50', 
                                      marginBottom: '5px' 
                                    }}>Lunch Break</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                      </svg>
                                      <span style={{ color: '#999', fontSize: '0.95rem' }}>Conference Hall</span>
                                    </div>
                                  </div>
                                  <div style={{
                                    padding: '6px 16px',
                                    background: '#ecf0f1',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    color: '#95a5a6',
                                    fontWeight: '500'
                                  }}>Break</div>
                                </div>

                                {/* Event 5 */}
                                <div style={{
                                  background: '#f8fafc',
                                  borderRadius: '14px',
                                  padding: '22px 24px',
                                  borderLeft: '4px solid #274338',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '24px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  border: '1px solid #f0f0f0',
                                  borderLeftWidth: '4px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f0f5f3';
                                  e.currentTarget.style.transform = 'translateX(8px)';
                                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8fafc';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                  <div style={{
                                    minWidth: '80px',
                                    fontFamily: 'monospace',
                                    fontSize: '1.2rem',
                                    color: '#274338',
                                    fontWeight: '600'
                                  }}>14:30</div>
                                  <div style={{ flex: 1 }}>
                                    <h4 style={{ 
                                      fontSize: '1.2rem', 
                                      fontWeight: '600', 
                                      color: '#2c3e50', 
                                      marginBottom: '5px' 
                                    }}>Parallel Sessions: Nanomaterials & Biomaterials</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                      </svg>
                                      <span style={{ color: '#999', fontSize: '0.95rem' }}>Rooms A & B</span>
                                    </div>
                                  </div>
                                  <div style={{
                                    padding: '6px 16px',
                                    background: '#e8f5f1',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    color: '#274338',
                                    fontWeight: '500'
                                  }}>Talk</div>
                                </div>

                                {/* Event 6 */}
                                <div style={{
                                  background: '#f8fafc',
                                  borderRadius: '14px',
                                  padding: '22px 24px',
                                  borderLeft: '4px solid #e67e22',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '24px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  border: '1px solid #f0f0f0',
                                  borderLeftWidth: '4px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f0f5f3';
                                  e.currentTarget.style.transform = 'translateX(8px)';
                                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8fafc';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                                >
                                  <div style={{
                                    minWidth: '80px',
                                    fontFamily: 'monospace',
                                    fontSize: '1.2rem',
                                    color: '#e67e22',
                                    fontWeight: '600'
                                  }}>16:00</div>
                                  <div style={{ flex: 1 }}>
                                    <h4 style={{ 
                                      fontSize: '1.2rem', 
                                      fontWeight: '600', 
                                      color: '#2c3e50', 
                                      marginBottom: '5px' 
                                    }}>Workshop: Materials Characterization Techniques</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                      </svg>
                                      <span style={{ color: '#999', fontSize: '0.95rem' }}>Workshop Hall</span>
                                    </div>
                                  </div>
                                  <div style={{
                                    padding: '6px 16px',
                                    background: '#fef5e7',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    color: '#e67e22',
                                    fontWeight: '500'
                                  }}>Workshop</div>
                                </div>
                              </div>

                              {/* Legend */}
                              <div style={{
                                marginTop: '40px',
                                paddingTop: '24px',
                                borderTop: '1px solid #e0e0e0',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '20px',
                                justifyContent: 'center'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '12px', height: '12px', background: '#274338', borderRadius: '3px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Registration</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '12px', height: '12px', background: '#3d5a4f', borderRadius: '3px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Keynote</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '12px', height: '12px', background: '#3498db', borderRadius: '3px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Talk</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '12px', height: '12px', background: '#95a5a6', borderRadius: '3px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Break</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '12px', height: '12px', background: '#e67e22', borderRadius: '3px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Workshop</span>
                                </div>
                              </div>
                                </>
                              )}

                              {/* Day 2 Schedule */}
                              {selectedDay === 2 && (
                                <>
                                  <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{ 
                                      fontSize: '1.9rem', 
                                      fontWeight: 700, 
                                      color: '#1a2d26', 
                                      marginBottom: '6px' 
                                    }}>Conference Day</h3>
                                    <p style={{ 
                                      fontSize: '1.05rem', 
                                      color: '#666', 
                                      marginBottom: '0',
                                      fontWeight: 400
                                    }}>{scheduleInfo.day2}, {conferenceDates.match(/\d{4}$/)?.[0] || '2027'}</p>
                                    <div style={{ width: '60px', height: '3px', background: '#274338', marginTop: '12px', borderRadius: '2px' }}></div>
                                  </div>

                                  {/* Event List */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {/* Event 1 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #3498db',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#3498db',
                                        fontWeight: '600'
                                      }}>08:30</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Plenary Session: Materials of Tomorrow</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Grand Auditorium</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#e3f2fd',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#3498db',
                                        fontWeight: '500'
                                      }}>Talk</div>
                                    </div>

                                    {/* Event 2 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #9b59b6',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#9b59b6',
                                        fontWeight: '600'
                                      }}>10:30</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Parallel Sessions: Computational Methods</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Rooms C & D</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#f4ecf7',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#9b59b6',
                                        fontWeight: '500'
                                      }}>Panel</div>
                                    </div>

                                    {/* Event 3 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #95a5a6',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#95a5a6',
                                        fontWeight: '600'
                                      }}>12:30</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Networking Lunch</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Dining Hall</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#ecf0f1',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#95a5a6',
                                        fontWeight: '500'
                                      }}>Break</div>
                                    </div>

                                    {/* Event 4 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #e67e22',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#e67e22',
                                        fontWeight: '600'
                                      }}>14:00</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Industry Workshops: AI in Materials</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Innovation Lab</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#fef5e7',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#e67e22',
                                        fontWeight: '500'
                                      }}>Workshop</div>
                                    </div>

                                    {/* Event 5 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #27ae60',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#27ae60',
                                        fontWeight: '600'
                                      }}>17:00</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Poster Session & Exhibition</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Exhibition Hall</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#e8f8f5',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#27ae60',
                                        fontWeight: '500'
                                      }}>Special</div>
                                    </div>

                                    {/* Event 6 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #e74c3c',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#e74c3c',
                                        fontWeight: '600'
                                      }}>19:00</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Gala Dinner & Awards Ceremony</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Ballroom</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#fadbd8',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#e74c3c',
                                        fontWeight: '500'
                                      }}>Special</div>
                                    </div>
                                  </div>

                                  {/* Legend */}
                                  <div style={{
                                    marginTop: '40px',
                                    paddingTop: '24px',
                                    borderTop: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    justifyContent: 'center'
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#3d5a4f', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Keynote</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#3498db', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Talk</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#95a5a6', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Break</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#9b59b6', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Panel</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#27ae60', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Special</span>
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Day 3 Schedule */}
                              {selectedDay === 3 && (
                                <>
                                  <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{ 
                                      fontSize: '1.9rem', 
                                      fontWeight: 700, 
                                      color: '#1a2d26', 
                                      marginBottom: '6px' 
                                    }}>Closing Day</h3>
                                    <p style={{ 
                                      fontSize: '1.05rem', 
                                      color: '#666', 
                                      marginBottom: '0',
                                      fontWeight: 400
                                    }}>{scheduleInfo.day3}, {conferenceDates.match(/\d{4}$/)?.[0] || '2027'}</p>
                                    <div style={{ width: '60px', height: '3px', background: '#274338', marginTop: '12px', borderRadius: '2px' }}></div>
                                  </div>

                                  {/* Event List */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {/* Event 1 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #3d5a4f',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#3d5a4f',
                                        fontWeight: '600'
                                      }}>09:00</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Closing Keynote: Future of Materials Science</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Grand Auditorium</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#e1ebe7',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#3d5a4f',
                                        fontWeight: '500'
                                      }}>Keynote</div>
                                    </div>

                                    {/* Event 2 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #3498db',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#3498db',
                                        fontWeight: '600'
                                      }}>10:30</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Technical Sessions: Emerging Technologies</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Multiple Rooms</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#e3f2fd',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#3498db',
                                        fontWeight: '500'
                                      }}>Talk</div>
                                    </div>

                                    {/* Event 3 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #95a5a6',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#95a5a6',
                                        fontWeight: '600'
                                      }}>12:00</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Coffee Break & Networking</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Foyer Area</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#ecf0f1',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#95a5a6',
                                        fontWeight: '500'
                                      }}>Break</div>
                                    </div>

                                    {/* Event 4 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #9b59b6',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#9b59b6',
                                        fontWeight: '600'
                                      }}>12:30</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Panel: Industry-Academia Collaboration</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Grand Auditorium</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#f4ecf7',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#9b59b6',
                                        fontWeight: '500'
                                      }}>Panel</div>
                                    </div>

                                    {/* Event 5 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #27ae60',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#27ae60',
                                        fontWeight: '600'
                                      }}>14:00</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Best Paper Awards & Closing Ceremony</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Grand Auditorium</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#e8f8f5',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#27ae60',
                                        fontWeight: '500'
                                      }}>Special</div>
                                    </div>

                                    {/* Event 6 */}
                                    <div style={{
                                      background: '#f8fafc',
                                      borderRadius: '14px',
                                      padding: '22px 24px',
                                      borderLeft: '4px solid #274338',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '24px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer',
                                      border: '1px solid #f0f0f0',
                                      borderLeftWidth: '4px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f0f5f3';
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(39,67,56,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8fafc';
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                      <div style={{
                                        minWidth: '80px',
                                        fontFamily: 'monospace',
                                        fontSize: '1.2rem',
                                        color: '#274338',
                                        fontWeight: '600'
                                      }}>15:30</div>
                                      <div style={{ flex: 1 }}>
                                        <h4 style={{ 
                                          fontSize: '1.2rem', 
                                          fontWeight: '600', 
                                          color: '#2c3e50', 
                                          marginBottom: '5px' 
                                        }}>Farewell Reception</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                          </svg>
                                          <span style={{ color: '#999', fontSize: '0.95rem' }}>Main Lobby</span>
                                        </div>
                                      </div>
                                      <div style={{
                                        padding: '6px 16px',
                                        background: '#e8f5f1',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        color: '#274338',
                                        fontWeight: '500'
                                      }}>Reception</div>
                                    </div>
                                  </div>

                                  {/* Legend */}
                                  <div style={{
                                    marginTop: '40px',
                                    paddingTop: '24px',
                                    borderTop: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '20px',
                                    justifyContent: 'center'
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#3d5a4f', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Keynote</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#3498db', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Talk</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#95a5a6', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Break</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#9b59b6', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Panel</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '12px', height: '12px', background: '#27ae60', borderRadius: '3px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>Special</span>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Who Should Attend & Why Attend Section */}
                      <div className="umb-block-grid__layout-item">
                        <section style={{ 
                          padding: '80px 0', 
                          background: '#ffffff', 
                          position: 'relative'
                        }}>
                          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
                            
                            {/* Section Header */}
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                              <h2 style={{ 
                                fontSize: '2.5rem', 
                                fontWeight: 700, 
                                color: '#1a2d26', 
                                marginBottom: '12px',
                                letterSpacing: '-0.5px'
                              }}>
                                Join a Global Community
                              </h2>
                              <p style={{ 
                                fontSize: '1.08rem', 
                                color: '#4a5568', 
                                maxWidth: '700px', 
                                margin: '0 auto',
                                lineHeight: '1.5',
                                fontWeight: 400
                              }}>
                                Learn why researchers, professionals, and innovators worldwide choose ICAMSE 2027 for collaboration, growth, and impact.
                              </p>
                            </div>

                            <div style={{ 
                              display: 'grid', 
                              gridTemplateColumns: 'repeat(2, 1fr)', 
                              gap: '50px', 
                              alignItems: 'start',
                              marginBottom: '40px'
                            }}>
                              
                              {/* Who Should Attend */}
                              <div style={{
                                background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)',
                                borderRadius: '16px',
                                padding: '40px 32px',
                                border: '1px solid rgba(39, 67, 56, 0.08)'
                              }}>
                                <h3 style={{
                                  fontSize: '1.6rem',
                                  fontWeight: 600,
                                  color: '#1a2d26',
                                  marginBottom: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px'
                                }}>
                                  <span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}><MdGroups size={28} style={{ marginRight: 6, color: '#274338' }} /></span>
                                  Who Should Attend
                                </h3>

                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0'
                                }}>
                                  {[
                                    'Materials Scientists & Engineers',
                                    'Chemists & Physicists', 
                                    'Nanotechnology Researchers',
                                    'Energy & Battery Specialists',
                                    'Biomedical Engineers',
                                    'Industry R&D Professionals',
                                    'Students & Early Career Researchers'
                                  ].map((item, index) => (
                                    <div key={index} style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      padding: '12px 0',
                                      borderBottom: index < 6 ? '1px solid rgba(39, 67, 56, 0.1)' : 'none',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.paddingLeft = '8px';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.paddingLeft = '0';
                                    }}
                                    >
                                      <div style={{
                                        width: '5px',
                                        height: '5px',
                                        background: '#274338',
                                        borderRadius: '50%',
                                        marginRight: '16px',
                                        flexShrink: 0,
                                        opacity: 0.7
                                      }}></div>
                                      <span style={{ 
                                        fontSize: '1rem', 
                                        color: '#333', 
                                        lineHeight: '1.5',
                                        fontWeight: 400
                                      }}>
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Why Attend */}
                              <div style={{
                                background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f4f8 100%)',
                                borderRadius: '16px',
                                padding: '40px 32px',
                                border: '1px solid rgba(39, 67, 56, 0.08)'
                              }}>
                                <h3 style={{
                                  fontSize: '1.6rem',
                                  fontWeight: 600,
                                  color: '#1a2d26',
                                  marginBottom: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px'
                                }}>
                                  <span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}><MdStarRate size={28} style={{ marginRight: 6, color: '#3498db' }} /></span>
                                  Why Attend
                                </h3>

                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0'
                                }}>
                                  {[
                                    'Access cutting-edge scientific research & innovations',
                                    'Network with 5,000+ global experts & leaders',
                                    'Build collaboration opportunities across sectors',
                                    'Publish in top-tier journals & proceedings',
                                    'Experience Switzerland\'s innovation ecosystem',
                                    'Discover latest industry technologies',
                                    'Professional development & career growth'
                                  ].map((item, index) => (
                                    <div key={index} style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      padding: '12px 0',
                                      borderBottom: index < 6 ? '1px solid rgba(39, 67, 56, 0.1)' : 'none',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.paddingLeft = '8px';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.paddingLeft = '0';
                                    }}
                                    >
                                      <div style={{
                                        width: '5px',
                                        height: '5px',
                                        background: '#274338',
                                        borderRadius: '50%',
                                        marginRight: '16px',
                                        flexShrink: 0,
                                        opacity: 0.7
                                      }}></div>
                                      <span style={{ 
                                        fontSize: '1rem', 
                                        color: '#333', 
                                        lineHeight: '1.5',
                                        fontWeight: 400
                                      }}>
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Call to Action */}
                            <div style={{
                              textAlign: 'center',
                              marginTop: '40px'
                            }}>
                              <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '16px',
                                background: 'linear-gradient(135deg, #274338 0%, #3d5a4f 100%)',
                                color: 'white',
                                padding: '20px 40px',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                boxShadow: '0 8px 32px rgba(39, 67, 56, 0.3)',
                                transition: 'all 0.3s ease',
                                border: 'none',
                                position: 'relative',
                                overflow: 'hidden'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(39, 67, 56, 0.4)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(39, 67, 56, 0.3)';
                              }}
                              >
                                <span>Register for ICAMSE 2027</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 12h14"></path>
                                  <path d="M12 5l7 7-7 7"></path>
                                </svg>
                              </div>
                              <p style={{
                                fontSize: '0.95rem',
                                color: '#666',
                                marginTop: '16px',
                                fontWeight: '400'
                              }}>
                                Early bird registration ends June 30, 2027
                              </p>
                            </div>

                            {/* Conference Gallery */}
                            <div style={{
                              margin: '60px auto 0',
                              maxWidth: '1400px',
                              padding: '0 20px',
                            }}>
                              <h3 style={{
                                textAlign: 'center',
                                fontSize: '2.2rem',
                                fontWeight: 600,
                                color: '#274338',
                                marginBottom: '32px',
                                letterSpacing: '-0.5px',
                              }}>
                                Conference Highlights
                              </h3>
                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '32px',
                                alignItems: 'stretch',
                              }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                  <img src={confImg1} alt="Conference Hallway" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 24px rgba(39,67,56,0.10)' }} draggable={false} onContextMenu={e => e.preventDefault()} />
                                  <img src={confImg3} alt="Conference Leaders" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 24px rgba(39,67,56,0.10)' }} draggable={false} onContextMenu={e => e.preventDefault()} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                  <img src={confImg2} alt="Conference Group" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 24px rgba(39,67,56,0.10)' }} draggable={false} onContextMenu={e => e.preventDefault()} />
                                  <img src={confImg4} alt="Conference Networking" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 24px rgba(39,67,56,0.10)' }} draggable={false} onContextMenu={e => e.preventDefault()} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
