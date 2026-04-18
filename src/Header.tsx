import React from 'react';
//import logo from './assets/ICAMSE2026_logo.png';
import { Link } from 'react-router-dom';
import { useConference } from './context/ConferenceContext';

interface NavLink {
  href: string;
  label: string;
  target?: string;
  ariaLabel: string;
}
interface HeaderProps {
  navLinks: NavLink[];
}

const Header: React.FC<HeaderProps> = ({ navLinks }) => {
  const { importantDetails } = useConference();
  
  // Get conference details from API or fallback
  // Strip HTML tags (API may return <br> tags)
  const conferenceDates = importantDetails?.ConferenceDates 
    ? importantDetails.ConferenceDates.replace(/<[^>]*>/g, '')
    : 'October 13-15, 2026';
  const conferenceVenue = importantDetails?.ConferenceVenue
    ? importantDetails.ConferenceVenue.replace(/<[^>]*>/g, '')
    : '';

  return (
    <header className="header main_header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, background: '#274338' }}>
      <div className="header__container">
        {/* Logo Section */}
        <div className="header__top-logo">
          <Link to="/" aria-label="Home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src="/ICAMSE2027_logo.png"
                  alt="ICAMSE2027 Logo"
                  style={{ height: '89px', width: 'auto', display: 'block' }}
                />
          </Link>
          <h6 className="header__meta-text">
            <span className="header__meta-date">{conferenceDates}</span>
            <span className="header__meta-venue">{conferenceVenue}</span>
          </h6>
        </div>

        {/* Header CTA - Desktop */}
        <div className="header__top-cta desktop-only">
          <div className="btn-theme-3 header_cta">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EVENT BROCHURE"
            >
              EVENT BROCHURE
            </a>
          </div>
             <div className="btn-theme-4 header_cta">
               <a href="/registration" aria-label="BOOK YOUR BOOTH">
                 BOOK YOUR BOOTH
               </a>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="header__menu">
          {/* Header CTA - Mobile */}
          <div className="header__top-cta mobile-only">
            <div className="btn-theme-3 header_cta">
              <a
                href="forms/download-event-brochure/index.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="EVENT BROCHURE"
              >
                EVENT BROCHURE
              </a>
            </div>
            <div className="btn-theme-4 header_cta">
                 <a href="/registration" aria-label="BOOK YOUR BOOTH">
                   BOOK YOUR BOOTH
                 </a>
            </div>
          </div>

          {/* Navigation List */}
          <ul className="header__menu-list">
            <li tabIndex={0}>
              <Link to="/" aria-label="home" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="home">
                  <svg height="18px" viewBox="0 0 512 512" width="16px" xmlns="http://www.w3.org/2000/svg">
                    <path d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0" />
                  </svg>
                </span>
                <span style={{ fontWeight: 600, fontSize: '1.05rem', color: '#fff' }}>Home</span>
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.ariaLabel} className="first-level">
                <span className="bg__after" />
                <Link
                  className=""
                  to={link.href}
                  aria-label={link.ariaLabel}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="hamburger-icon">
          <span />
          <span />
          <span />
        </div>
      </div>
    </header>
  );
};

export default Header;
