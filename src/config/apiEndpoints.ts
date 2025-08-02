
/**
 * API Endpoints Configuration
 * Centralized management of all API endpoints with descriptions and parameters
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

export const API_ENDPOINTS = {
  // Authentication APIs
  auth: {
    register: {
      url: `${API_BASE_URL}/auth/register`,
      method: 'POST',
      description: 'Register a new user account',
      parameters: ['name', 'email', 'phone']
    },
    sendOTP: {
      url: `${API_BASE_URL}/auth/send-otp`,
      method: 'POST',
      description: 'Send OTP to user phone number',
      parameters: ['phone']
    },
    verifyOTP: {
      url: `${API_BASE_URL}/auth/verify-otp`,
      method: 'POST',
      description: 'Verify OTP and authenticate user',
      parameters: ['phone', 'otp']
    }
  },

  // User Management APIs
  users: {
    getUser: {
      url: (id: string) => `${API_BASE_URL}/users/${id}`,
      method: 'GET',
      description: 'Get user details by ID',
      parameters: ['id']
    },
    updateUser: {
      url: (id: string) => `${API_BASE_URL}/users/${id}`,
      method: 'PUT',
      description: 'Update user information',
      parameters: ['id', 'userData']
    }
  },

  // Provider Management APIs
  providers: {
    register: {
      url: `${API_BASE_URL}/providers`,
      method: 'POST',
      description: 'Register a new service provider',
      parameters: ['name', 'email', 'phone', 'company_name', 'service_type', 'experience_years', 'location', 'description']
    },
    getAll: {
      url: `${API_BASE_URL}/providers`,
      method: 'GET',
      description: 'Get all providers with optional filtering',
      parameters: ['page', 'limit', 'service_type', 'location', 'status', 'search']
    },
    getById: {
      url: (id: string) => `${API_BASE_URL}/providers/${id}`,
      method: 'GET',
      description: 'Get provider details by ID',
      parameters: ['id']
    },
    update: {
      url: (id: string) => `${API_BASE_URL}/providers/${id}`,
      method: 'PUT',
      description: 'Update provider information',
      parameters: ['id', 'providerData']
    },
    updateStatus: {
      url: (id: string) => `${API_BASE_URL}/providers/${id}/status`,
      method: 'PATCH',
      description: 'Update provider status (approve/reject)',
      parameters: ['id', 'status']
    },
    delete: {
      url: (id: string) => `${API_BASE_URL}/providers/${id}`,
      method: 'DELETE',
      description: 'Delete a provider',
      parameters: ['id']
    },
    search: {
      url: `${API_BASE_URL}/providers/search`,
      method: 'GET',
      description: 'Search providers by criteria',
      parameters: ['query', 'filters']
    },
    checkPhone: {
      url: `${API_BASE_URL}/providers/check-phone`,
      method: 'GET',
      description: 'Check if provider exists by phone number',
      parameters: ['phone']
    }
  },

  // Business Provider APIs
  business: {
    register: {
      url: `${API_BASE_URL}/business/register`,
      method: 'POST',
      description: 'Register a new business provider',
      parameters: [
        'name',
        'email',
        'phone',
        'company_name',
        'service_type',
        'experience_years',
        'location',
        'description',
        'website' // optional
      ]
    },
    getProfile: {
      url: (id: string) => `${API_BASE_URL}/business/${id}`,
      method: 'GET',
      description: 'Get business provider profile',
      parameters: ['id']
    },
    update: {
      url: (id: string) => `${API_BASE_URL}/business/${id}`,
      method: 'PUT',
      description: 'Update business provider information',
      parameters: ['id', 'businessData', 'files']
    },
    getDashboard: {
      url: (id: string) => `${API_BASE_URL}/business/${id}/dashboard`,
      method: 'GET',
      description: 'Get business dashboard data',
      parameters: ['id']
    }
  },

  // Booking Management APIs
  bookings: {
    create: {
      url: `${API_BASE_URL}/bookings`,
      method: 'POST',
      description: 'Create a new booking request',
      parameters: ['providerId', 'service', 'date', 'time', 'price', 'requirements']
    },
    getAll: {
      url: `${API_BASE_URL}/bookings`,
      method: 'GET',
      description: 'Get all bookings for user/provider',
      parameters: ['page', 'limit', 'status', 'userId', 'providerId']
    },
    getById: {
      url: (id: string) => `${API_BASE_URL}/bookings/${id}`,
      method: 'GET',
      description: 'Get booking details by ID',
      parameters: ['id']
    },
    updateStatus: {
      url: (id: string) => `${API_BASE_URL}/bookings/${id}/status`,
      method: 'PUT',
      description: 'Update booking status',
      parameters: ['id', 'status']
    }
  },

  // Message APIs
  messages: {
    getMessages: {
      url: `${API_BASE_URL}/messages`,
      method: 'GET',
      description: 'Get user messages',
      parameters: ['userId', 'page', 'limit']
    },
    sendMessage: {
      url: `${API_BASE_URL}/messages`,
      method: 'POST',
      description: 'Send a new message',
      parameters: ['recipientId', 'content', 'type']
    },
    getMessage: {
      url: (id: string) => `${API_BASE_URL}/messages/${id}`,
      method: 'GET',
      description: 'Get specific message by ID',
      parameters: ['id']
    }
  },

  // OTP APIs (WhatsApp via Twilio)
  otp: {
    send: {
      url: `${API_BASE_URL}/otp/send`,
      method: 'POST',
      description: 'Send WhatsApp OTP to phone number (with country code)',
      parameters: ['phoneNumber (e.g., +919620548555)']
    },
    verify: {
      url: `${API_BASE_URL}/otp/verify`,
      method: 'POST',
      description: 'Verify WhatsApp OTP code',
      parameters: ['phoneNumber (e.g., +919620548555)', 'code']
    },
    status: {
      url: `${API_BASE_URL}/otp/status`,
      method: 'GET',
      description: 'Check Twilio service status',
      parameters: []
    }
  }
} as const;

export default API_ENDPOINTS;