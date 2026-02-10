import React, { useEffect, useState } from 'react';
import heroBg from './assets/hero-bg.jpg';
import conferenceImg from './assets/Conferenec_img01.png';
import confImg1 from './assets/Conferenec_img02.png';
import confImg2 from './assets/Conferenec_img03.png';
import confImg3 from './assets/Conferenec_img04.png';
import confImg4 from './assets/Conferenec_img05.png';
import './css/vendorc619.css';
import './css/mainc09f.css';
import './css/devstyles43e1.css';
import { 
  MdScience, 
  MdBuild, 
  MdBolt, 
  MdMemory, 
  MdSearch, 
  MdLocalHospital, 
  MdBusiness 
} from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

interface StatisticItem {
  value: number;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
  target?: string;
  ariaLabel: string;
}

interface SocialLink {
  url: string;
  label: string;
  icon: React.ReactNode;
}

interface FooterContact {
  title: string;
  email: string;
}

interface TrackItem {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  topics: string[];
}

const AmericasLNGSummit: React.FC = () => {
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

  // State for selected day in Event Schedule
  const [selectedDay, setSelectedDay] = useState(1);

  // Navigation links for header
  const navLinks: NavLink[] = [
    { href: '#about', label: 'About', ariaLabel: 'About' },
    { href: '#speakers', label: 'Speakers', ariaLabel: 'Speakers' },
    { href: '#schedule', label: 'Schedule', ariaLabel: 'Schedule' },
    { href: '#ocm', label: 'OCM', ariaLabel: 'OCM' },
    { href: '#sponsors', label: 'Sponsors', ariaLabel: 'Sponsors' },
    { href: '#gallery', label: 'Gallery', ariaLabel: 'Gallery' },
    { href: '#submit-abstract', label: 'Submit Abstract', ariaLabel: 'Submit Abstract' },
    { href: '#contact', label: 'Contact', ariaLabel: 'Contact' },
  ];

  // Banner statistics
  const statistics: StatisticItem[] = [
    { value: 5000, label: 'Attendees' },
    { value: 300, label: 'Exhibitors' },
    { value: 150, label: 'Speakers' },
    { value: 40, label: 'Conference Sessions' },
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      url: 'https://www.facebook.com/people/Americas-LNG-Summit-Exhibition/61579621898944/?mibextid=wwXIfr',
      label: 'Follow us on Facebook',
      icon: <FaFacebookF size={20} color="#4267B2" />,
    },
    {
      url: 'https://twitter.com/AmericasGas',
      label: 'Follow us on Twitter',
      icon: <FaTwitter size={20} color="#1DA1F2" />,
    },
    {
      url: 'https://www.linkedin.com/company/americas-lng-gas/',
      label: 'Follow us on LinkedIn',
      icon: <FaLinkedinIn size={20} color="#0077B5" />,
    },
    {
      url: 'https://www.youtube.com/channel/UColSwAl55Qam-waYgCAmybw',
      label: 'Follow us on YouTube',
      icon: <FaYoutube size={20} color="#FF0000" />,
    },
  ];

  // Footer contacts
  const footerContacts: FooterContact[] = [
    { title: 'Speaking and conference', email: 'info@americaslngsummit.com' },
    { title: 'Attending and group bookings', email: 'delegates@americaslngsummit.com' },
    { title: 'General inquiries', email: 'info@americaslngsummit.com' },
    { title: 'Sponsorship and exhibition', email: 'sales@americaslngsummit.com' },
    { title: 'Marketing and partnerships', email: 'marketing@americaslngsummit.com' },
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

      <Header navLinks={navLinks} />

      <main>
        {/* Social Icons Section */}
        <section className="social-icons__wrapper">
          <div className="social-icons--inner">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </section>

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
                        <h1>
                          International Conference on 
                          <br />
                          Advanced Materials Science and  Engineering
                          <br />
                         
                        </h1>
                      </div>
                      <div className="btn-wrap">
                        <div className="btn-theme-3">
                          <a href="forms/del-reg/delegate-registration/index.html" className="button__primary">
                            BOOK YOUR DELEGATE PASS
                          </a>
                        </div>
                        <div className="btn-theme-5">
                          <a href="forms/visitor-registration/index.html" className="button__primary">
                            BOOK YOUR EXHIBITION VISITOR PASS
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
          marginTop: '-60px',
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
                                    The International Conference on Advanced Materials Science and Engineering (ICAMSE 2026) aims to bring together leading scientists, engineers, academicians, industry professionals, and young researchers from around the world to exchange the latest advances, innovations, and challenges in materials science.
                                  </p>
                                  <p>
                                    The conference will serve as a premier interdisciplinary platform to present cutting-edge research on the design, synthesis, characterization, processing, and application of advanced materials across energy, healthcare, electronics, manufacturing, and sustainability sectors.
                                  </p>
                                  <p>
                                    Held in the heart of Bern, Switzerland, ICAMSE 2026 offers a unique opportunity to foster global collaborations in a high-quality academic and industrial environment.
                                  </p>

                                {/* Content Statistics */}
                                <div className="statistics">
                                  <div className="statistics__col-wrap">
                                    <div className="swiper statistics-slider__swiper1">
                                      <div className="swiper-wrapper">
                                        {statistics.map((stat) => (
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
                                    <a href="forms/download-event-brochure/index.html" target="_blank" rel="noopener noreferrer">
                                      EVENT BROCHURE
                                    </a>
                                  </div>
                                  <div className="btn-theme-4">
                                    <a href="forms/book-your-booth/index.html" target="_blank" rel="noopener noreferrer">
                                      BOOK YOUR BOOTH
                                    </a>
                                  </div>
                                  <div className="btn-theme-4">
                                    <a href="forms/del-reg/delegate-registration/index.html" target="_blank" rel="noopener noreferrer">
                                      BOOK A DELEGATE PASS
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* Conference Image */}
                              <div className="two-col-media">
                                <img 
                                  src={conferenceImg} 
                                  alt="International Conference on Advanced Materials Science and Engineering" 
                                  style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                                    objectFit: 'cover'
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Conference Objectives Section */}
                      <div className="umb-block-grid__layout-item">
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
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(102, 126, 234, 0.3)',
                                      }}>✓</span>
                                      Showcase recent breakthroughs in advanced materials research
                                    </li>
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(102, 126, 234, 0.3)',
                                      }}>✓</span>
                                      Foster interdisciplinary collaboration across scientific domains
                                    </li>
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(102, 126, 234, 0.3)',
                                      }}>✓</span>
                                      Encourage young researchers and students to present their work
                                    </li>
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(102, 126, 234, 0.3)',
                                      }}>✓</span>
                                      Advance fundamental understanding of materials science
                                    </li>
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(102, 126, 234, 0.3)',
                                      }}>✓</span>
                                      Promote cutting-edge characterization and testing methodologies
                                    </li>
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
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(231, 76, 60, 0.3)',
                                      }}>✓</span>
                                      Promote collaboration between academia and industry
                                    </li>
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(231, 76, 60, 0.3)',
                                      }}>✓</span>
                                      Discuss challenges and future directions in materials science
                                    </li>
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(231, 76, 60, 0.3)',
                                      }}>✓</span>
                                      Facilitate knowledge exchange through plenary, keynote, and technical sessions
                                    </li>
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(231, 76, 60, 0.3)',
                                      }}>✓</span>
                                      Bridge the gap between fundamental research and industrial applications
                                    </li>
                                    <li style={{
                                      fontSize: '1rem',
                                      color: '#555',
                                      paddingLeft: '45px',
                                      position: 'relative',
                                      lineHeight: '1.7',
                                    }}>
                                      <span style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '2px',
                                        width: '30px',
                                        height: '30px',
                                        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        boxShadow: '0 3px 10px rgba(231, 76, 60, 0.3)',
                                      }}>✓</span>
                                      Accelerate technology transfer and commercialization of materials innovations
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Scientific Themes & Tracks Section */}
                      <div className="umb-block-grid__layout-item">
                        <section className="image-text-card-block three-col-image-card enable-background" style={{ padding: '60px 0', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                          <div className="container">
                            <div className="common-head" style={{ textAlign: 'center', marginBottom: '50px' }}>
                              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#333', marginBottom: '15px' }}>
                                Scientific Themes & Tracks
                              </h2>
                              <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
                                Explore our comprehensive range of research themes and technical tracks
                              </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                              {scientificTracks.map((track, index) => (
                                <div
                                  key={index}
                                  style={{
                                    background: '#ffffff',
                                    borderRadius: '12px',
                                    padding: '30px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                                  }}
                                >
                                  <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#3498db' }}>
                                    <track.icon size={48} />
                                  </div>
                                  <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#2c3e50', marginBottom: '20px', minHeight: '60px' }}>
                                    {track.title}
                                  </h3>
                                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {track.topics.map((topic, topicIndex) => (
                                      <li
                                        key={topicIndex}
                                        style={{
                                          fontSize: '0.95rem',
                                          color: '#555',
                                          marginBottom: '10px',
                                          paddingLeft: '20px',
                                          position: 'relative',
                                          lineHeight: '1.6',
                                        }}
                                      >
                                        <span
                                          style={{
                                            position: 'absolute',
                                            left: '0',
                                            top: '8px',
                                            width: '6px',
                                            height: '6px',
                                            background: '#3498db',
                                            borderRadius: '50%',
                                          }}
                                        />
                                        {topic}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>
                      </div>

                      {/* Event Schedule Section */}
                      <div className="umb-block-grid__layout-item">
                        <section style={{ 
                          padding: '80px 0', 
                          background: 'linear-gradient(135deg, #274338 0%, #1a2d26 100%)',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          {/* Background Pattern */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }}></div>

                          <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
                            {/* Header */}
                            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                              <h2 style={{ 
                                fontSize: '2.8rem', 
                                fontWeight: '700', 
                                color: '#ffffff', 
                                marginBottom: '15px',
                                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }}>
                                Event Schedule
                              </h2>
                              <p style={{ 
                                fontSize: '1.2rem', 
                                color: 'rgba(255,255,255,0.95)', 
                                maxWidth: '600px', 
                                margin: '0 auto',
                                fontWeight: '300'
                              }}>
                                October 13-15, 2026 • Three Days of Innovation and Excellence
                              </p>
                            </div>

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
                                  background: selectedDay === 1 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.2)',
                                  border: selectedDay === 1 ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                                  padding: '15px 40px',
                                  borderRadius: '12px',
                                  color: selectedDay === 1 ? '#274338' : 'rgba(255, 255, 255, 0.8)',
                                  fontSize: '1.1rem',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  boxShadow: selectedDay === 1 ? '0 4px 20px rgba(255, 255, 255, 0.3)' : 'none',
                                  transition: 'all 0.3s ease'
                                }}>
                                Day 1
                              </button>
                              <button 
                                onClick={() => setSelectedDay(2)}
                                style={{
                                  background: selectedDay === 2 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.2)',
                                  border: selectedDay === 2 ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                                  padding: '15px 40px',
                                  borderRadius: '12px',
                                  color: selectedDay === 2 ? '#274338' : 'rgba(255, 255, 255, 0.8)',
                                  fontSize: '1.1rem',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  boxShadow: selectedDay === 2 ? '0 4px 20px rgba(255, 255, 255, 0.3)' : 'none',
                                  transition: 'all 0.3s ease'
                                }}>
                                Day 2
                              </button>
                              <button 
                                onClick={() => setSelectedDay(3)}
                                style={{
                                  background: selectedDay === 3 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.2)',
                                  border: selectedDay === 3 ? 'none' : '2px solid rgba(255, 255, 255, 0.3)',
                                  padding: '15px 40px',
                                  borderRadius: '12px',
                                  color: selectedDay === 3 ? '#274338' : 'rgba(255, 255, 255, 0.8)',
                                  fontSize: '1.1rem',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  boxShadow: selectedDay === 3 ? '0 4px 20px rgba(255, 255, 255, 0.3)' : 'none',
                                  transition: 'all 0.3s ease'
                                }}>
                                Day 3
                              </button>
                            </div>

                            {/* Schedule Content */}
                            <div style={{ 
                              background: 'rgba(255, 255, 255, 0.95)',
                              borderRadius: '20px',
                              padding: '35px',
                              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                              backdropFilter: 'blur(10px)'
                            }}>
                              {/* Day 1 Schedule */}
                              {selectedDay === 1 && (
                                <>
                                  <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{ 
                                      fontSize: '1.8rem', 
                                      fontWeight: '600', 
                                      color: '#274338', 
                                      marginBottom: '8px' 
                                    }}>Opening Day</h3>
                                    <p style={{ 
                                      fontSize: '1rem', 
                                      color: '#666', 
                                      marginBottom: '20px' 
                                    }}>October 13, 2026</p>
                                  </div>

                                  {/* Event List */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {/* Event 1 */}
                                <div style={{
                                  background: '#f8f9fa',
                                  borderRadius: '12px',
                                  padding: '20px',
                                  borderLeft: '4px solid #274338',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '20px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#e8f5f1';
                                  e.currentTarget.style.transform = 'translateX(10px)';
                                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(39, 67, 56, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8f9fa';
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
                                  background: '#f8f9fa',
                                  borderRadius: '12px',
                                  padding: '20px',
                                  borderLeft: '4px solid #3d5a4f',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '20px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f3e5f5';
                                  e.currentTarget.style.transform = 'translateX(10px)';
                                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(118, 75, 162, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8f9fa';
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
                                  background: '#f8f9fa',
                                  borderRadius: '12px',
                                  padding: '20px',
                                  borderLeft: '4px solid #3498db',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '20px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#e3f2fd';
                                  e.currentTarget.style.transform = 'translateX(10px)';
                                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8f9fa';
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
                                  background: '#f8f9fa',
                                  borderRadius: '12px',
                                  padding: '20px',
                                  borderLeft: '4px solid #95a5a6',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '20px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#ecf0f1';
                                  e.currentTarget.style.transform = 'translateX(10px)';
                                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(149, 165, 166, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8f9fa';
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
                                  background: '#f8f9fa',
                                  borderRadius: '12px',
                                  padding: '20px',
                                  borderLeft: '4px solid #274338',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '20px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#e8f5f1';
                                  e.currentTarget.style.transform = 'translateX(10px)';
                                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(39, 67, 56, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8f9fa';
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
                                  background: '#f8f9fa',
                                  borderRadius: '12px',
                                  padding: '20px',
                                  borderLeft: '4px solid #e67e22',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '20px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#fef5e7';
                                  e.currentTarget.style.transform = 'translateX(10px)';
                                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(230, 126, 34, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8f9fa';
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
                                marginTop: '30px',
                                paddingTop: '20px',
                                borderTop: '1px solid #e0e0e0',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '15px',
                                justifyContent: 'center'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ width: '16px', height: '16px', background: '#274338', borderRadius: '4px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.9rem' }}>Registration</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ width: '16px', height: '16px', background: '#3d5a4f', borderRadius: '4px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.9rem' }}>Keynote</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ width: '16px', height: '16px', background: '#3498db', borderRadius: '4px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.9rem' }}>Talk</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ width: '16px', height: '16px', background: '#95a5a6', borderRadius: '4px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.9rem' }}>Break</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ width: '16px', height: '16px', background: '#e67e22', borderRadius: '4px' }}></div>
                                  <span style={{ color: '#666', fontSize: '0.9rem' }}>Workshop</span>
                                </div>
                              </div>
                                </>
                              )}

                              {/* Day 2 Schedule */}
                              {selectedDay === 2 && (
                                <>
                                  <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{ 
                                      fontSize: '1.8rem', 
                                      fontWeight: '600', 
                                      color: '#274338', 
                                      marginBottom: '8px' 
                                    }}>Conference Day</h3>
                                    <p style={{ 
                                      fontSize: '1rem', 
                                      color: '#666', 
                                      marginBottom: '20px' 
                                    }}>October 14, 2026</p>
                                  </div>

                                  {/* Event List */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {/* Event 1 */}
                                    <div style={{
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #3498db',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#e3f2fd';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #9b59b6',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f4ecf7';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #95a5a6',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#ecf0f1';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(149, 165, 166, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #e67e22',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#fef5e7';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(230, 126, 34, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #27ae60',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#e8f8f5';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #e74c3c',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#fadbd8';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                    marginTop: '30px',
                                    paddingTop: '20px',
                                    borderTop: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '15px',
                                    justifyContent: 'center'
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#3d5a4f', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Keynote</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#3498db', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Talk</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#95a5a6', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Break</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#9b59b6', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Panel</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#27ae60', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Special</span>
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Day 3 Schedule */}
                              {selectedDay === 3 && (
                                <>
                                  <div style={{ marginBottom: '30px' }}>
                                    <h3 style={{ 
                                      fontSize: '1.8rem', 
                                      fontWeight: '600', 
                                      color: '#274338', 
                                      marginBottom: '8px' 
                                    }}>Closing Day</h3>
                                    <p style={{ 
                                      fontSize: '1rem', 
                                      color: '#666', 
                                      marginBottom: '20px' 
                                    }}>October 15, 2026</p>
                                  </div>

                                  {/* Event List */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {/* Event 1 */}
                                    <div style={{
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #3d5a4f',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#e1ebe7';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(118, 75, 162, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #3498db',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#e3f2fd';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #95a5a6',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#ecf0f1';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(149, 165, 166, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #9b59b6',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#f4ecf7';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #27ae60',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#e8f8f5';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                      background: '#f8f9fa',
                                      borderRadius: '12px',
                                      padding: '20px',
                                      borderLeft: '4px solid #274338',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '20px',
                                      transition: 'all 0.3s ease',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = '#e8f5f1';
                                      e.currentTarget.style.transform = 'translateX(10px)';
                                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = '#f8f9fa';
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
                                    marginTop: '30px',
                                    paddingTop: '20px',
                                    borderTop: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '15px',
                                    justifyContent: 'center'
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#3d5a4f', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Keynote</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#3498db', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Talk</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#95a5a6', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Break</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#9b59b6', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Panel</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <div style={{ width: '16px', height: '16px', background: '#27ae60', borderRadius: '4px' }}></div>
                                      <span style={{ color: '#666', fontSize: '0.9rem' }}>Special</span>
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
                          padding: '60px 0', 
                          background: '#ffffff', 
                          position: 'relative'
                        }}>
                          <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px' }}>
                            
                            {/* Section Header */}
                            <div style={{ textAlign: 'center', marginBottom: '50px', marginTop: '0' }}>
                              <div style={{
                                display: 'inline-block',
                                padding: '6px 18px',
                                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                                borderRadius: '30px',
                                marginBottom: '12px',
                                border: '1px solid rgba(39, 67, 56, 0.08)'
                              }}>
                                <span style={{
                                  fontSize: '0.95rem',
                                  fontWeight: '600',
                                  color: '#274338',
                                  letterSpacing: '0.5px',
                                  textTransform: 'uppercase'
                                }}>
                                  Join the Community
                                </span>
                              </div>
                              <h2 style={{ 
                                fontSize: '2.2rem', 
                                fontWeight: '500', 
                                color: '#1a1a1a', 
                                marginBottom: '12px',
                                lineHeight: '1.15',
                                letterSpacing: '-0.5px'
                              }}>
                                ICAMSE 2026 in <span style={{ fontWeight: '700', color: '#274338' }}>Bern, Switzerland</span>
                              </h2>
                              <p style={{ 
                                fontSize: '1.08rem', 
                                color: '#444', 
                                maxWidth: '650px', 
                                margin: '0 auto',
                                lineHeight: '1.5',
                                fontWeight: '400'
                              }}>
                                October 13-15, 2026 &mdash; Connect with global leaders, innovators, and peers in advanced materials science. Expand your network, share your research, and be part of a vibrant, forward-thinking community shaping the future of engineering and technology.
                              </p>
                            </div>

                            <div style={{ 
                              display: 'grid', 
                              gridTemplateColumns: 'repeat(2, 1fr)', 
                              gap: '60px', 
                              alignItems: 'start',
                              marginBottom: '0'
                            }}>
                              
                              {/* Who Should Attend */}
                              <div style={{
                                position: 'relative'
                              }}>
                                <div style={{
                                  marginBottom: '28px'
                                }}>
                                  <h3 style={{
                                    fontSize: '2rem',
                                    fontWeight: '300',
                                    color: '#1a1a1a',
                                    marginBottom: '12px',
                                    lineHeight: '1.2'
                                  }}>
                                    Who Should
                                    <br />
                                    <span style={{
                                      fontWeight: '600',
                                      color: '#274338'
                                    }}>
                                      Attend
                                    </span>
                                  </h3>
                                  <div style={{
                                    width: '60px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #274338 0%, #3d5a4f 100%)',
                                    borderRadius: '2px'
                                  }}></div>
                                </div>

                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0'
                                }}>
                                  {[
                                    'Materials Scientists and Engineers',
                                    'Chemists and Physicists', 
                                    'Nanotechnology Researchers',
                                    'Energy & Battery Researchers',
                                    'Biomedical Engineers',
                                    'Industry R&D Professionals',
                                    'PhD Scholars, Master\'s & Undergraduate Students'
                                  ].map((item, index) => (
                                    <div key={index} style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      padding: '14px 0',
                                      borderBottom: index < 6 ? '1px solid #f0f0f0' : 'none',
                                      transition: 'all 0.3s ease',
                                      cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.opacity = '0.8';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.opacity = '1';
                                    }}
                                    >
                                      <div style={{
                                        width: '6px',
                                        height: '6px',
                                        background: '#274338',
                                        borderRadius: '50%',
                                        marginRight: '20px',
                                        flexShrink: 0,
                                        transition: 'all 0.3s ease'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.5)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                      }}
                                      ></div>
                                      <span style={{ 
                                        fontSize: '1.05rem', 
                                        color: '#333', 
                                        lineHeight: '1.4',
                                        fontWeight: '400'
                                      }}>
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Why Attend */}
                              <div style={{
                                position: 'relative'
                              }}>
                                <div style={{
                                  marginBottom: '28px'
                                }}>
                                  <h3 style={{
                                    fontSize: '2rem',
                                    fontWeight: '300',
                                    color: '#1a1a1a',
                                    marginBottom: '12px',
                                    lineHeight: '1.2'
                                  }}>
                                    Why
                                    <br />
                                    <span style={{
                                      fontWeight: '600',
                                      color: '#274338'
                                    }}>
                                      Attend
                                    </span>
                                  </h3>
                                  <div style={{
                                    width: '60px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #274338 0%, #3d5a4f 100%)',
                                    borderRadius: '2px'
                                  }}></div>
                                </div>

                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0'
                                }}>
                                  {[
                                    'High-quality scientific program with cutting-edge research presentations',
                                    'Strong international participation with experts from 50+ countries',
                                    'Excellent networking with industry leaders and academia',
                                    'Publication prospects in top-tier journals and conference proceedings',
                                    'Hosted in Bern, Switzerland, a global hub for science, innovation, and culture',
                                    'Access to latest technologies and industry innovations',
                                    'Professional development workshops and career opportunities'
                                  ].map((item, index) => (
                                    <div key={index} style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      padding: '14px 0',
                                      borderBottom: index < 6 ? '1px solid #f0f0f0' : 'none',
                                      transition: 'all 0.3s ease',
                                      cursor: 'default'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = 'translateX(8px)';
                                      e.currentTarget.style.opacity = '0.8';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = 'translateX(0)';
                                      e.currentTarget.style.opacity = '1';
                                    }}
                                    >
                                      <div style={{
                                        width: '6px',
                                        height: '6px',
                                        background: '#274338',
                                        borderRadius: '50%',
                                        marginRight: '20px',
                                        flexShrink: 0,
                                        transition: 'all 0.3s ease'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.5)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                      }}
                                      ></div>
                                      <span style={{ 
                                        fontSize: '1.05rem', 
                                        color: '#333', 
                                        lineHeight: '1.4',
                                        fontWeight: '400'
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
                                <span>Register for ICAMSE 2026</span>
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
                                Early bird registration ends June 30, 2026
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
                                  <img src={confImg1} alt="Conference Hallway" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 24px rgba(39,67,56,0.10)' }} />
                                  <img src={confImg3} alt="Conference Leaders" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 24px rgba(39,67,56,0.10)' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                  <img src={confImg2} alt="Conference Group" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 24px rgba(39,67,56,0.10)' }} />
                                  <img src={confImg4} alt="Conference Networking" style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 4px 24px rgba(39,67,56,0.10)' }} />
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

      <Footer socialLinks={socialLinks} footerContacts={footerContacts} />
    </>
  );
};

export default AmericasLNGSummit;
