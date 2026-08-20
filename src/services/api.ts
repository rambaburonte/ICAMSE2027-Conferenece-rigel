import axios from 'axios';

// Use proxy in development, direct URL in production
const BACKEND_URL = 'https://api.rigelworld.com';
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 seconds timeout for better reliability
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple in-memory cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Get members/speakers by username
 * @param {string} username - The username to get members for
 * Returns list of speakers/members for the conference
 */
export const getMembersByUser = async (username: string) => {
  const cacheKey = `members_${username}`;

  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached members for:', username);
    return cached.data;
  }

  const response = await apiClient.get(`/fetch/members/user/${username}`);

  // Cache the response
  apiCache.set(cacheKey, {
    data: response.data,
    timestamp: Date.now()
  });

  return response.data;
};

/**
 * Get conference login details by submitting conference URL
 * @param {string} conferenceUrl - The conference URL to submit
 * Returns conference configuration including email, username, ConfName, conference_url, etc.
 */
export const getConferenceLoginDetailsByUrl = async (conferenceUrl: string) => {
  const response = await apiClient.post('/fetch/login-details/conference-url/', {
    url: conferenceUrl
  });
  return response.data;
};

/**
 * Get important conference details by shortname
 * @param {string} shortName - The conference shortname/username
 * Returns detailed conference information including title, venue, dates, deadlines, social links, etc.
 */
export const getImportantDetailsByShortName = async (shortName: string) => {
  console.log('Calling getImportantDetailsByShortName with shortName:', shortName);

  const cacheKey = `important_details_${shortName}`;

  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached important details for:', shortName);
    return cached.data;
  }

  const response = await apiClient.get(`/fetch/important-details/shortname/${shortName}`);

  // Cache the response
  apiCache.set(cacheKey, {
    data: response.data,
    timestamp: Date.now()
  });

  return response.data;
};

/**
 * Get conference PDF links by conference ID.
 * @param {number} conferenceId - The conference ID
 */
export const getConferencePdfsById = async (conferenceId: number) => {
  const response = await apiClient.get(`/fetch/pdfs/id/${conferenceId}`);
  return response.data;
};

/**
 * Get schedule data by conference short name
 * @param {string} shortName - The conference short name
 * Returns schedule data for the conference
 */
export const getScheduleByShortName = async (shortName: string) => {
  console.log('Calling getScheduleByShortName with shortName:', shortName);

  const cacheKey = `schedule_${shortName}`;

  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached schedule for:', shortName);
    return cached.data;
  }

  try {
    const response = await apiClient.get(`/fetch/schedule/shortname/${shortName}`);

    // Cache the response
    apiCache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });

    return response.data;
  } catch (error) {
    console.log('Schedule API not available, returning null');
    return null;
  }
};

/**
 * Get conference login details from local backend API
 * Returns conference configuration including email, username, ConfName, conference_url, etc.
 */
export const getConferenceLoginDetails = async () => {
  // Use icamse2027.com as the conference identifier regardless of deployment domain
  const conferenceUrl = 'icamse2027.com';

  const cacheKey = `login_details_${conferenceUrl}`;

  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached login details for:', conferenceUrl);
    return cached.data;
  }

  const response = await apiClient.get(`/fetch/login-details/conference-url/${conferenceUrl}`);

  // Cache the response
  apiCache.set(cacheKey, {
    data: response.data,
    timestamp: Date.now()
  });

  return response.data;
};

/**
 * Submit registration
 * @param {object} registrationData - The registration data
 * Returns registration result
 */
export const submitRegistration = async (registrationData: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  console.log('Submitting registration to API:', registrationData);
  try {
    const response = await apiClient.post('/register', registrationData);
    console.log('Registration API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration API error:', error);
    throw error;
  }
};

/**
 * Create Stripe payment intent for registration
 * @param {object} paymentData - The payment request data
 * Returns Stripe payment intent
 */
export const createStripePaymentIntent = async (paymentData: unknown) => {
  const response = await apiClient.post('/payment/stripe/register', paymentData);
  return response.data;
};

/**
 * Create PayPal payment for registration
 * @param {object} paymentData - The payment request data
 * Returns PayPal payment details
 */
export const createPaypalPayment = async (paymentData: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const response = await apiClient.post('/payment/paypal/register', paymentData);
  return response.data;
};

/**
 * Submit abstract
 * @param {object} abstractData - The abstract data
 * Returns submission result
 */
export const submitAbstract = async (formData: FormData) => {
  // Create a new axios instance without default Content-Type for file uploads
  const uploadClient = axios.create({
    baseURL: API_BASE,
    timeout: 30000, // 30 seconds for file uploads
  });

  const response = await uploadClient.post('/abstract/submit', formData);
  return response.data;
};

/**
 * Submit contact form
 * @param {object} contactData - The contact form data
 * Returns submission result
 */
export const submitContact = async (contactData: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const response = await apiClient.post('/contact-us', contactData);
  return response.data;
};

/**
 * Extract error message from API error
 * @param {Error} error - Error object
 */
export const getErrorMessage = (error: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (error.response) {
    // Server responded with error
    const data = error.response.data;
    if (typeof data === 'string') {
      return data;
    }
    if (data?.message) {
      return data.message;
    }
    if (data?.error) {
      return data.error;
    }
    if (typeof data === 'object') {
      // Try to extract error message from common object structures
      return JSON.stringify(data);
    }
    return 'Server error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server. Please check your connection.';
  } else {
    // Error in request setup
    return error.message || 'An unexpected error occurred';
  }
};

/**
 * Validate discount code
 * @param {string} code - The discount code to validate
 * @param {string} conferenceId - The conference ID
 * Returns discount information or null if invalid
 */
export const validateDiscountCode = async (code: string, conferenceId: string) => {
  try {
    const response = await apiClient.post('/discount/validate', {
      code,
      conferenceId
    });
    return response.data;
  } catch (error) {
    console.log('Discount code validation failed:', error);
    return null;
  }
};

interface SponsorshipInquiryData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  sponsorshipTier: string;
  message: string;
}

/**
 * Submit sponsorship inquiry
 * @param {SponsorshipInquiryData} sponsorshipData - The sponsorship inquiry data
 * Returns submission result
 */
export const submitSponsorshipInquiry = async (sponsorshipData: SponsorshipInquiryData) => {
  const response = await apiClient.post('/sponsorship/inquiry', sponsorshipData);
  return response.data;
};

/**
 * Get call for abstracts/tracks by user
 * @param {string} user - The user identifier
 * Returns list of tracks/abstract categories for the conference
 */
export const getCallForAbstractsByUser = async (user: string) => {
  const cacheKey = `call_for_abstracts_${user}`;

  // Check cache first
  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached call for abstracts for:', user);
    return cached.data;
  }

  try {
    console.log('Making API call to:', `/fetch/call-for-abstracts/user/${user}`);
    const response = await apiClient.get(`/fetch/call-for-abstracts/user/${user}`);
    console.log('API response received:', response);
    console.log('API response data:', response.data);

    // Cache the response
    apiCache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });

    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    console.log('Call for abstracts API not available, returning empty array');
    return [];
  }
};

/**
 * Clear API cache
 */
export const clearApiCache = () => {
  apiCache.clear();
  console.log('API cache cleared');
};

/**
 * Get current conference short name from URL or default
 */
export const getCurrentConferenceShortName = () => {
  // Try to get from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const confParam = urlParams.get('conf') || urlParams.get('conference');

  if (confParam) {
    return confParam.toUpperCase();
  }

  // Fallback to ICAMSE2027
  return 'ICAMSE2027';
};


export const getPdfsById = async (id: number) => {
  try {
    const response = await apiClient.get(`/fetch/pdfs/id/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching PDFs by ID:', error);
    return [];
  }
};

// Export axios instance for custom requests
export default apiClient;