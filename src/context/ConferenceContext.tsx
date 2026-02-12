import { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentConferenceShortName,
  getConferenceLoginDetails,
  getConferenceLoginDetailsByUrl,
  getImportantDetailsByShortName
} from '@/services/api';

const ConferenceContext = createContext<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

export const useConference = () => {
  const context = useContext(ConferenceContext);
  if (!context) {
    throw new Error('useConference must be used within ConferenceProvider');
  }
  return context;
};

export const ConferenceProvider = ({ children }: { children: React.ReactNode }) => {
  const [siteConfig] = useState<any>({ // eslint-disable-line @typescript-eslint/no-explicit-any
    name: 'ICAMSE 2027 Conference',
    shortName: 'ICAMSE2027',
    contactEmail: 'info@icamse2027.com',
    theme: {
      primary: '#1a365d',
      secondary: '#f7fafc'
    }
  });
  const [loginDetails, setLoginDetails] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [importantDetails, setImportantDetails] = useState<any>({ // eslint-disable-line @typescript-eslint/no-explicit-any
    ConferenceTitle: 'International Conference on Advanced Materials Science and Engineering 2027',
    ConferenceDates: 'March 15-16, 2027',
    ConferenceVenue: 'Bangalore, India',
    ShortName: 'ICAMSE2027',
    EmailId1: 'info@icamse2027.com'
  });
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
      setError('Failed to fetch conference login details');
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
      const finalDetails = details || importantDetails;
      setImportantDetails(finalDetails);
      console.log('Loaded important details:', finalDetails);
      return finalDetails;
    } catch (err) {
      const fetchError = err as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error('Failed to fetch important details:', fetchError.message, fetchError.response?.data);
      setError('Failed to fetch conference important details');
      // Use default instead
      return importantDetails;
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        await fetchLoginDetails();
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const value = {
    siteConfig,
    loginDetails,
    importantDetails,
    shortName,
    loading,
    error,
    refreshConferenceData: fetchLoginDetails,
    getConferenceName: () => {
      return importantDetails?.ConferenceTitle || 'ICAMSE 2027 Conference';
    }
  };

  return (
    <ConferenceContext.Provider value={value}>
      {children}
    </ConferenceContext.Provider>
  );
};