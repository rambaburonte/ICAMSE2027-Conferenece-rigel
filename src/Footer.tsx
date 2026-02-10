import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

interface SocialLink {
  url: string;
  label: string;
  icon: React.ReactNode;
}

interface FooterContact {
  title: string;
  email: string;
}

interface FooterProps {
  socialLinks: SocialLink[];
  footerContacts: FooterContact[];
}

const Footer: React.FC<FooterProps> = ({ socialLinks, footerContacts }) => {
  return (
    <>
      {/* Main Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-block">
            {/* Footer Block 1: Timings & Location */}
            <div className="footer-block-1">
              <div className="footer-timings">
                <h5 className="footer-heading">
                  <svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style={{ enableBackground: 'new 0 0 24 24' } as React.CSSProperties} xmlSpace="preserve">
                    <path d="M19,4h-1V2h-2v2H8V2H6v2H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20H5V10h14V20z M19,8H5V6h14V8z M9,14H7v-2h2V14z M13,14h-2v-2h2V14z M17,14h-2v-2h2V14z M9,18H7v-2h2V18z M13,18h-2v-2h2 V18z M17,18h-2v-2h2V18z" />
                  </svg>
                  EXHIBITION TIMINGS
                </h5>
                <div className="footer-content">
                  <p>
                    October 14, 2026: 10:00 AM-6:00 PM
                    <br />
                    October 15, 2026: 9:00 AM-5:30 PM
                  </p>
                </div>
              </div>

              <div className="footer-venue">
                <h5 className="footer-heading">
                  <svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' } as React.CSSProperties} xmlSpace="preserve">
                    <path d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333S208.948,85.333,256,85.333S341.333,123.615,341.333,170.667S303.052,256,256,256z" />
                  </svg>
                  LOCATION
                </h5>
                <div className="footer-content">
                  <p>Event Center, Lake Charles, USA</p>
                </div>
              </div>
            </div>

            {/* Footer Block 2: Quick Links */}
            <div className="footer-block-2">
              <h5 className="footer-heading">
                <svg version="1.1" x="0px" y="0px" viewBox="0 0 162.656 162.656" style={{ enableBackground: 'new 0 0 162.656 162.656' } as React.CSSProperties} xmlSpace="preserve">
                  <g>
                    <path d="M151.764,10.894c-14.522-14.522-38.152-14.525-52.676-0.008l0.003,0.003L76.112,33.872l10.607,10.605l22.983-22.988 l-0.002-0.002c8.678-8.663,22.785-8.658,31.457,0.014c8.673,8.672,8.672,22.786,0,31.461l-34.486,34.484c-4.201,4.202-9.787,6.516-15.729,6.516c-5.942,0-11.529-2.314-15.73-6.516L64.605,98.052c7.035,7.035,16.389,10.91,26.338,10.91c9.949,0,19.303-3.875,26.335-10.91l34.487-34.484C166.284,49.043,166.284,25.413,151.764,10.894z" />
                    <path d="M52.96,141.162L52.96,141.162c-8.675,8.67-22.788,8.668-31.461-0.005c-8.673-8.675-8.673-22.791-0.001-31.465L55.98,75.21c8.675-8.674,22.789-8.674,31.462,0L98.05,64.604c-14.524-14.523-38.154-14.524-52.676,0L10.89,99.086c-14.519,14.523-14.519,38.154,0.001,52.678c7.263,7.262,16.801,10.893,26.341,10.892c9.536,0,19.074-3.629,26.333-10.887l0.002-0.001l22.984-22.99l-10.608-10.606L52.96,141.162z" />
                  </g>
                </svg>
                QUICK LINKS
              </h5>
              <div className="footer_list">
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a
                      rel="noreferrer noopener"
                      href="conferences/strategic-conference/about-the-strategic-conference/index.html"
                      target="_blank"
                      title="About The Strategic Conference"
                    >
                      About the Strategic Conference
                    </a>
                  </li>
                  <li>
                    <a
                      rel="noreferrer noopener"
                      href="conferences/technical-conference/about-the-technical-conference/index.html"
                      target="_blank"
                      title="About The Technical Conference"
                    >
                      About the Technical Conference
                    </a>
                  </li>
                  <li>
                    <a href="contact-us-now/contact-us/index.html" title="REGISTER YOUR INTEREST">
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="footer-socialmedia">
                <h5 className="footer-heading">
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" viewBox="0 0 13.15 12.79">
                    <g id="Layer_1-2">
                      <g>
                        <path
                          className="cls-1"
                          d="m11.4,10.8c.35-.17.88-.41,1.02-.81.14-.39-.1-.8-.17-1.19.38-.1.81-.36.88-.93.08-.62-.37-.89-.84-1.16.1-.09.17-.16.25-.21.38-.28.58-.66.4-1.12-.17-.45-.53-.65-1.02-.64-1.33.03-2.66,0-3.99,0,.23-1.53.69-3.13-.58-4.37-.38-.37-1.08-.61-1.18.04-.14.85.38,1.86,0,2.7-.4.88-.88,1.53-1.37,2.37-.24.42-.58.79-.85,1.19-.08.12-.14.29-.14.44-.01,1.44-.01,2.87,0,4.31,0,.13.04.32.13.39.46.35.94.63,1.57.62,1.54-.02,3.08.01,4.62,0,.96,0,1.96-.56,1.28-1.64"
                        />
                        <path
                          className="cls-1"
                          d="m2.5,12.79H.62c-.34,0-.62-.28-.62-.62v-5.45c0-.34.28-.62.62-.62h1.88c.34,0,.62.28.62.62v5.45c0,.34-.28.62-.62.62"
                        />
                      </g>
                    </g>
                  </svg>
                  FOLLOW US
                </h5>
                <ul>
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                        {link.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Block 3: Contact */}
            <div className="footer-block-3">
              <h5 className="footer-heading">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-at-sign"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                </svg>
                CONTACT US
              </h5>
              <div className="footer-content-row">
                {footerContacts.map((contact) => (
                  <div key={contact.email} className="footer-content-text">
                    <p>{contact.title}</p>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-links">
              <a
                href="https://www.dmgevents.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read our Privacy Policy"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.dmgevents.com/website-terms/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read our Terms and Conditions"
              >
                Terms & Conditions
              </a>
              <a
                href="https://www.dmgevents.com/cookies-policy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read our Cookie Policy"
              >
                Cookie Policy
              </a>
              <a
                href="https://www.dmgevents.com/visitor-terms/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitor Terms"
              >
                Visitor Terms
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* DMG Footer */}
      <div className="dmgfooter">
        <div className="container">
          <div className="dmgfooter__row">
            <div className="dmgfooter__col">
              <div className="dmgfooter__col-logo">
                <div className="dmgfooter__col-logo-icon">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#274338', letterSpacing: '2px' }}>ICAMSE2026</span>
                  </a>
                </div>
                <p>
                  ICAMSE 2026 – International Conference on Advanced Materials Science & Engineering. Join us in Bern, Switzerland for a premier gathering of global experts, researchers, and innovators in materials science.
                </p>
              </div>
            </div>
            <div className="dmgfooter__col dmgfooter__col-icons">
              <ul>
                <li>
                  <a href="https://www.facebook.com/dmgeventsglobal/" target="_blank" rel="noopener noreferrer" aria-label="DMG Facebook">
                    <FaFacebookF size={20} color="#4267B2" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/dmgeventsglobal?mx=2" target="_blank" rel="noopener noreferrer" aria-label="DMG Twitter">
                    <FaTwitter size={20} color="#1DA1F2" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/dmgevents/" target="_blank" rel="noopener noreferrer" aria-label="DMG LinkedIn">
                    <FaLinkedinIn size={20} color="#0077B5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="dmgfooter__row-links">
            <ul>
              <li>
                <a href="https://www.dmgevents.com/cookies-policy/" target="_blank" rel="noopener noreferrer">
                  Cookies Preferences
                </a>
              </li>
              <li>
                <a href="https://www.dmgevents.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
                  Privacy
                </a>
              </li>
              <li>
                <a href="https://www.dmgevents.com/website-terms/" target="_blank" rel="noopener noreferrer">
                  Website Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
