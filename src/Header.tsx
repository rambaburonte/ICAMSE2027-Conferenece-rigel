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
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  // Get conference details from API or fallback
  // Strip HTML tags (API may return <br> tags)
  const conferenceDates = importantDetails?.ConferenceDates 
    ? importantDetails.ConferenceDates.replace(/<[^>]*>/g, '')
    : 'October 13-15, 2026';
  const conferenceVenue = importantDetails?.ConferenceVenue
    ? importantDetails.ConferenceVenue.replace(/<[^>]*>/g, '')
    : '';

  React.useEffect(() => {
    if (!menuOpen) return;

    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('resize', closeMenu);

    return () => window.removeEventListener('resize', closeMenu);
  }, [menuOpen]);

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
        <div id="mobile-navigation" className={`header__menu${menuOpen ? ' open' : ''}`}>
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
          <ul className={`header__menu-list${menuOpen ? ' open' : ''}`}>
            <li tabIndex={0}>
              <Link
                to="/"
                aria-label="home"
                onClick={() => setMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
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
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger Menu Icon */}
        <button
          type="button"
          className={`hamburger-icon${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <style>{`
          @media (max-width: 900px) {
            .header__menu {
              position: fixed;
              top: 0;
              right: 0;
              width: 82vw;
              max-width: 340px;
              height: 100vh;
              background: #274338;
              box-shadow: -2px 0 16px rgba(0, 0, 0, 0.18);
              transform: translateX(100%);
              transition: transform 0.3s ease;
              z-index: 2000;
              display: block;
              padding-top: 96px;
            }

            .header__menu.open {
              transform: translateX(0);
            }

            .header__menu-list {
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0;
              width: 100%;
              height: 100%;
              overflow-y: auto;
              padding: 0;
              margin: 0;
              list-style: none;
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.2s ease;
            }

            .header__menu-list.open {
              opacity: 1;
              pointer-events: auto;
            }

            .header__menu-list.open li {
              display: block;
              width: 100%;
              margin: 0;
              padding: 0;
              position: relative;
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }

            .header__menu-list.open li .bg__after {
              display: none;
            }

            .header__menu-list.open li a {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 0;
              width: 100%;
              box-sizing: border-box;
              padding: 16px 28px;
              color: #fff !important;
              font-size: 1.05rem;
              font-weight: 600;
              text-align: left;
            }

            .header__menu-list.open li:first-child a {
              padding-left: 28px;
            }

            .header__menu-list.open li:first-child .home {
              display: none;
            }

            .header__menu-list.open li:first-child span:last-child {
              margin-left: 0;
            }

            .hamburger-icon {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 44px;
              height: 44px;
              padding: 0;
              border: 0;
              background: rgba(39, 67, 56, 0.95);
              border-radius: 8px;
              position: fixed;
              top: 18px;
              right: 18px;
              z-index: 2100;
              cursor: pointer;
            }

            .hamburger-icon span {
              display: block;
              width: 24px;
              height: 3px;
              margin: 3px 0;
              background: #fff;
              border-radius: 2px;
              transition: transform 0.3s ease, opacity 0.3s ease;
            }

            .hamburger-icon.open span:nth-child(1) {
              transform: translateY(6px) rotate(45deg);
            }

            .hamburger-icon.open span:nth-child(2) {
              opacity: 0;
            }

            .hamburger-icon.open span:nth-child(3) {
              transform: translateY(-6px) rotate(-45deg);
            }
          }

          @media (min-width: 901px) {
            .hamburger-icon {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </header>
  );
};

export default Header;
