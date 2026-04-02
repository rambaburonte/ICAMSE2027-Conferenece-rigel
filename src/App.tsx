import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Speakers from './pages/Speakers';
import Schedule from './pages/Schedule';
import OCM from './pages/OCM';
import Sponsors from './pages/Sponsors';
import Gallery from './pages/Gallery';
import SubmitAbstract from './pages/SubmitAbstract';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import DiscountRegistration from './pages/DiscountRegistration';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './components/ScrollToTop';
import { ConferenceProvider } from './context/ConferenceContext';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './App.css';

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

function App() {
  // Navigation links for header
  const navLinks: NavLink[] = [
    { href: '/about', label: 'About', ariaLabel: 'About' },
    { href: '/speakers', label: 'Speakers', ariaLabel: 'Speakers' },
    { href: '/schedule', label: 'Schedule', ariaLabel: 'Schedule' },
    { href: '/ocm', label: 'OCM', ariaLabel: 'OCM' },
    { href: '/sponsors', label: 'Sponsors', ariaLabel: 'Sponsors' },
    { href: '/gallery', label: 'Gallery', ariaLabel: 'Gallery' },
    { href: '/submit-abstract', label: 'Submit Abstract', ariaLabel: 'Submit Abstract' },
    { href: '/registration', label: 'Registration', ariaLabel: 'Registration' },
    { href: '/contact', label: 'Contact', ariaLabel: 'Contact' },
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
    { title: 'Secretary', email: 'secretary@icamse2027.com' },
    { title: 'General Contact', email: 'contact@icamse2027.com' },
    { title: 'Information', email: 'info@icamse2027.com' },
  ];

  return (
    <ConferenceProvider>
      <Router>
        <ScrollToTop />
        <Header navLinks={navLinks} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/ocm" element={<OCM />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/submit-abstract" element={<SubmitAbstract />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/discount-registration" element={<DiscountRegistration />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer socialLinks={socialLinks} footerContacts={footerContacts} />
      </Router>
    </ConferenceProvider>
  );
}

export default App;
