import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentConferenceShortName,
  getErrorMessage,
  getConferenceLoginDetails,
  getConferenceLoginDetailsByUrl,
  getImportantDetailsByShortName
} from '../services/api';

const ConferenceContext = createContext<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

export const useConference = () => {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error('useConference must be used within ConferenceProvider');
  }
  return context;
};

export const ConferenceProvider = ({ children }: { children: React.ReactNode }) => {
  const [siteConfig, setSiteConfig] = useState<any>(getCachedSiteConfig()); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loginDetails, setLoginDetails] = useState<any>(getCachedLoginDetails()); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [importantDetails, setImportantDetails] = useState<any>(getCachedImportantDetails() || getDefaultImportantDetails()); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [pricing, setPricing] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [shortName, setShortName] = useState<string>(getCurrentConferenceShortName());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch conference login details from external API
  const fetchLoginDetails = async (conferenceUrl?: string) => {
    try {
      let data;
      if (conferenceUrl) {
        // Submit URL to get login details
        data = await getConferenceLoginDetailsByUrl(conferenceUrl);
      } else {
        // Use current hostname
        data = await getConferenceLoginDetails();
      }

      console.log('Login API raw response:', data);

      // Data might be an array or object
      const details = Array.isArray(data) ? (data.length > 0 ? data[0] : null) : data;
      console.log('Parsed login details:', details);

      setLoginDetails(details);
      // Cache in localStorage
      if (details) {
        localStorage.setItem('conferenceLoginDetails', JSON.stringify(details));
      }
      console.log('Loaded login details:', details);

      // Update shortName from login details username
      if (details && details.username) {
        setShortName(details.username);
        console.log('Will fetch important details for username:', details.username);
        await fetchImportantDetails(details.username);
      } else {
        console.log('No username in login details, using fallback');
        setShortName('ICAMSE2027');
        await fetchImportantDetails('ICAMSE2027');
      }

      return details;
    } catch (err) {
      console.error('Failed to fetch login details:', err);
      console.error('Error details:', err instanceof Error ? err.message : String(err));
      // Don't set error for login details, it's optional
      // Use fallback
      setShortName('ICAMSE2027');
      await fetchImportantDetails('ICAMSE2027');
      return null;
    }
  };

  // Fetch important conference details using shortname
  const fetchImportantDetails = async (shortName: string) => {
    console.log('Fetching important details for shortName:', shortName);
    try {
      const data = await getImportantDetailsByShortName(shortName);
      // Data might be an array or object
      const details = Array.isArray(data) ? (data.length > 0 ? data[0] : null) : data;
      const finalDetails = details || getDefaultImportantDetails();
      setImportantDetails(finalDetails);
      // Regenerate site config with new important details
      setSiteConfig(getDefaultConfig(shortName, finalDetails));
      // Cache in localStorage
      localStorage.setItem('conferenceImportantDetails', JSON.stringify(finalDetails));
      console.log('Loaded important details:', finalDetails);
      return finalDetails;
    } catch (err) {
      const error = err as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Failed to fetch important details:', error.message, error.response?.data);
      // Don't set error for important details, use default instead
      setImportantDetails(getDefaultImportantDetails());
      return getDefaultImportantDetails();
    }
  };

  // Fetch pricing for all categories
  const fetchPricing = async (_conferenceId: string) => {
    // Use fallback pricing since API doesn't exist
    const fallbackPricing = {
      speaker: getFallbackPricing('speaker'),
      delegate: getFallbackPricing('delegate'),
      poster: getFallbackPricing('poster'),
      student: getFallbackPricing('student'),
    };
    setPricing(fallbackPricing);
    return fallbackPricing;
  };

  // Submit conference URL to get login and important details
  const submitConferenceUrl = async (conferenceUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      const loginData = await fetchLoginDetails(conferenceUrl);
      if (loginData && loginData.username) {
        // Important details are already fetched in fetchLoginDetails
        return { loginDetails: loginData, importantDetails };
      }
      return { loginDetails: loginData, importantDetails: null };
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      console.error('Failed to submit conference URL:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Refresh conference data
  const refreshSiteConfig = () => {
    // Use default config since API doesn't exist
    setSiteConfig(getDefaultConfig(shortName, importantDetails));
    return getDefaultConfig(shortName, importantDetails);
  };

  // Change conference by short name
  const changeConference = async (newShortName: string) => {
    if (newShortName === shortName) return;

    setShortName(newShortName);
    setLoading(true);
    setError(null);

    try {
      await Promise.all([
        fetchLoginDetails(),
        fetchPricing(newShortName)
      ]);
      console.log('Changed conference to:', newShortName);
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);
      console.error('Failed to change conference:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get pricing for specific category based on current tier
  const getPricing = (category = 'delegate') => {
    const currentTier = getPricingTier();

    // Try to get pricing from API first
    let basePrice = 0;
    if (pricing && pricing[category]) {
      const categoryPricing = pricing[category].prices ? pricing[category].prices[category] : pricing[category];
      if (typeof categoryPricing === 'object' && categoryPricing.earlyBird) {
        // API provides tiered pricing
        basePrice = categoryPricing.earlyBird || 0;
      } else if (typeof categoryPricing === 'number') {
        // API provides single price, use as early bird base
        basePrice = categoryPricing;
      }
    }

    // Fallback to hardcoded pricing if API fails
    if (basePrice === 0) {
      const pricingConfig: Record<string, number> = {
        speaker: 649,
        delegate: 749,
        listener: 749,
        poster: 499,
        student: 349,
        exhibitor: 5000,
      };
      basePrice = pricingConfig[category] || 0;
    }

    // Apply tier-based adjustments
    switch (currentTier) {
      case 'earlyBird':
        return basePrice;
      case 'midTerm':
        return basePrice + 100; // Early Bird + 100
      case 'onSpot':
        return (basePrice + 100) + 200; // Mid-term price + 200 (Early Bird + 100 + 200)
      default:
        return basePrice;
    }
  };

  // Get all pricing
  const getAllPricing = () => {
    return {
      speaker: getPricing('speaker'),
      delegate: getPricing('delegate'),
      listener: getPricing('listener'),
      poster: getPricing('poster'),
      student: getPricing('student'),
      exhibitor: getPricing('exhibitor'),
    };
  };

  // Check if registration is open
  const isRegistrationOpen = () => {
    return siteConfig?.registrationOpen !== false;
  };

  // Check if abstract submission is open
  const isAbstractSubmissionOpen = () => {
    return siteConfig?.abstractSubmissionOpen !== false;
  };

  // Get days until conference
  const getDaysUntilConference = () => {
    if (!siteConfig?.dates?.conferenceDates) return null;

    try {
      const confDateStr = siteConfig.dates.conferenceDates.split(' to ')[0] || siteConfig.dates.conferenceDates;
      const confDate = new Date(confDateStr);
      const today = new Date();
      const diff = confDate.getTime() - today.getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    } catch (err) {
      console.error('Error calculating days until conference:', err);
      return null;
    }
  };

  // Get pricing tier label
  const getPricingTierLabel = () => {
    const currentTier = getPricingTier();
    switch (currentTier) {
      case 'earlyBird':
        return 'Early Bird';
      case 'midTerm':
        return 'Standard';
      case 'onSpot':
        return 'Final';
      default:
        return 'Standard';
    }
  };

  // Get pricing tier color
  const getPricingTierColor = () => {
    const currentTier = getPricingTier();
    switch (currentTier) {
      case 'earlyBird':
        return 'green';
      case 'midTerm':
        return 'yellow';
      case 'onSpot':
        return 'red';
      default:
        return 'yellow';
    }
  };

  // Get current pricing tier
  const getPricingTier = () => {
    const now = new Date();
    const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Remove time component

    // Parse deadline dates from importantDetails
    const earlyBirdDeadline = importantDetails?.EarlyBird ? new Date(importantDetails.EarlyBird) : null;
    const midTermDeadline = importantDetails?.mid_term ? new Date(importantDetails.mid_term) : null;

    // Determine current pricing tier based on dates
    if (earlyBirdDeadline && currentDate <= earlyBirdDeadline) {
      return 'earlyBird';
    } else if (midTermDeadline && currentDate <= midTermDeadline) {
      return 'midTerm';
    } else {
      return 'onSpot';
    }
  };

  // Get conference name
  const getConferenceName = () => {
    return importantDetails?.ConferenceTitle || loginDetails?.ConfName || siteConfig?.fullName || siteConfig?.title || 'Conference';
  };

  // Get conference venue from important details API
  const getConferenceVenue = () => {
    return importantDetails?.ConferenceVenue || siteConfig?.venue?.name || 'Conference Venue';
  };

  // Get conference short name
  const getConferenceShortName = () => {
    return loginDetails?.username || importantDetails?.ShortName || siteConfig?.shortName || shortName;
  };

  // Get conference theme/tagline
  const getConferenceTheme = () => {
    return siteConfig?.theme || siteConfig?.tagline || '';
  };

  // Get venue information
  const getVenue = () => {
    return siteConfig?.venue || {};
  };

  // Get contact information
  const getContact = () => {
    return siteConfig?.contact || {};
  };

  // Get social media links
  const getSocial = () => {
    return siteConfig?.social || {};
  };

  // Get conference logo
  const getLogo = () => {
    return siteConfig?.branding?.logo || '';
  };

  // Get conference dates
  const getDates = () => {
    return siteConfig?.dates || {};
  };

  // Get deadlines
  const getDeadlines = () => {
    const dates = getDates();
    return {
      abstractSubmission: dates.abstractSubmissionDeadline,
      earlyBird: dates.earlyBirdDeadline,
      midTerm: dates.midTermDeadline,
      late: dates.lateRegistrationDeadline,
      onSpot: dates.onSpotDate,
    };
  };

  // Get important dates from API
  const getImportantDates = () => {
    return {
      abstract_submission_deadline: importantDetails?.abstract_submission_deadline || '',
      registration_opens: importantDetails?.registration_opens || '',
      EarlyBird: importantDetails?.EarlyBird || '',
      mid_term: importantDetails?.mid_term || '',
      OnSpot: importantDetails?.OnSpot || '',
    };
  };

  // Load site configuration and login details on mount
  useEffect(() => {
    console.log('ConferenceContext useEffect triggered, shortName:', shortName);

    // Set default config immediately to prevent loading delay
    if (!siteConfig) {
      setSiteConfig(getDefaultConfig(shortName, importantDetails));
    }
    setLoading(false); // Set loading to false immediately

    // Load all API data immediately in parallel for fast loading
    const loadAllData = async () => {
      try {
        console.log('Loading all conference data in parallel...');
        // Fetch everything in parallel for maximum speed
        await Promise.all([
          fetchLoginDetails(),
          fetchPricing(shortName)
        ]);
        console.log('All conference data loaded successfully');
      } catch (error) {
        console.error('Conference data loading failed:', error);
        // Don't show error toast, use cached/default data
      }
    };

    // Start loading immediately
    loadAllData();
  }, []);

  const value = {
    // State
    siteConfig,
    loginDetails,
    importantDetails,
    conference: importantDetails, // Alias for backward compatibility
    pricing,
    shortName,
    loading,
    error,

    // Actions
    fetchLoginDetails,
    fetchImportantDetails,
    fetchPricing,
    submitConferenceUrl,
    changeConference,
    refreshSiteConfig,

    // Pricing
    getPricing,
    getAllPricing,
    getPricingTierLabel,
    getPricingTierColor,
    getPricingTier,

    // Conference Info
    getConferenceName,
    getConferenceVenue,
    getConferenceShortName,
    getConferenceTheme,
    getVenue,
    getContact,
    getSocial,
    getLogo,
    getDates,
    getDeadlines,
    getImportantDates,

    // Utility
    isRegistrationOpen,
    isAbstractSubmissionOpen,
    getDaysUntilConference,
  };

  return (
    <ConferenceContext.Provider value={value}>
      {children}
    </ConferenceContext.Provider>
  );
};

// Default fallback configuration
const getDefaultConfig = (shortName: string, importantDetails: any = null) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
  shortName: shortName,
  name: shortName,
  fullName: 'ICAMSE 2027 Conference',
  title: 'ICAMSE2027',
  theme: 'Advancing Materials Science and Engineering',
  description: 'Join leading researchers and innovators in materials science and engineering for cutting-edge insights and collaboration.',
  registrationOpen: true,
  abstractSubmissionOpen: true,
  dates: {
    start: importantDetails?.ConferenceStartDate || '2027-03-15T09:00:00',
    end: importantDetails?.ConferenceEndDate || '2027-03-16T18:00:00',
    submission: importantDetails?.abstract_submission_deadline || '2027-01-15',
    notification: importantDetails?.notification_date || '2027-02-01',
    cameraReady: importantDetails?.camera_ready_deadline || '2027-02-15',
    earlyBirdDeadline: importantDetails?.EarlyBird || '2027-01-31',
    standardDeadline: importantDetails?.mid_term || '2027-02-28',
    finalDeadline: importantDetails?.OnSpot || '2027-03-10',
  },
  venue: {
    city: importantDetails?.ConferenceCity,
    country: importantDetails?.ConferenceCountry,
    name: importantDetails?.ConferenceVenue || 'Conference Center'
  },
  contact: {},
  social: {},
  branding: {},
  pricingTier: {
    tier: 'earlyBird',
    label: 'Early Bird',
    color: 'green',
  },
  tracks: [
    { id: 'materials', name: 'Advanced Materials', color: '#0ea5e9' },
    { id: 'nano', name: 'Nanomaterials', color: '#8b5cf6' },
    { id: 'energy', name: 'Energy Materials', color: '#f59e0b' },
    { id: 'bio', name: 'Biomaterials', color: '#06b6d4' },
    { id: 'computational', name: 'Computational Materials', color: '#10b981' },
    { id: 'sustainable', name: 'Sustainable Materials', color: '#84cc16' },
  ]
});

// Default important details for immediate rendering
const getDefaultImportantDetails = () => ({
  ConferenceTitle: 'International Conference on Advanced Materials Science and Engineering 2027',
  ConferenceDates: 'March 15-16, 2027',
  ConferenceVenue: 'Bangalore, India',
  ShortName: 'ICAMSE2027',
  confName: 'ICAMSE2027', // Add confName for compatibility
  EmailId1: 'info@icamse2027.com',
  abstract_submission_deadline: '',
  registration_opens: '',
  EarlyBird: '',
  mid_term: '',
  OnSpot: '',
});

// Fallback pricing configuration
const getFallbackPricing = (_category: string) => ({
  registrationCategory: 'Standard',
  prices: {
    speaker: 649,
    poster: 499,
    delegate: 749,
    listener: 749,
    student: 349,
    exhibitor: 5000,
  },
});

// Cache helpers
const getCachedLoginDetails = () => {
  try {
    const cached = localStorage.getItem('conferenceLoginDetails');
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const getCachedImportantDetails = () => {
  try {
    const cached = localStorage.getItem('conferenceImportantDetails');
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

const getCachedSiteConfig = () => {
  try {
    const cached = localStorage.getItem('conferenceSiteConfig');
    if (cached) {
      return JSON.parse(cached);
    }
    const cachedImportantDetails = getCachedImportantDetails();
    const defaultConfig = getDefaultConfig(getCurrentConferenceShortName(), cachedImportantDetails);
    localStorage.setItem('conferenceSiteConfig', JSON.stringify(defaultConfig));
    return defaultConfig;
  } catch {
    return getDefaultConfig(getCurrentConferenceShortName(), null);
  }
};