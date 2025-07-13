
// client/src/api/index.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

export const apiEndpoints = {
  auth: {
    register: `${API_URL}/auth/register`,
    sendOTP: `${API_URL}/auth/send-otp`,
    verifyOTP: `${API_URL}/auth/verify-otp`,
  },
  users: {
    getUser: (id) => `${API_URL}/users/${id}`,
    updateUser: (id) => `${API_URL}/users/${id}`,
  },
  messages: {
    getMessages: `${API_URL}/messages`,
    sendMessage: `${API_URL}/messages`,
    getMessage: (id) => `${API_URL}/messages/${id}`,
  },
  providers: {
    register: `${API_URL}/providers`,
    getAll: `${API_URL}/providers`,
    getById: (id) => `${API_URL}/providers/${id}`,
    update: (id) => `${API_URL}/providers/${id}`,
    updateStatus: (id) => `${API_URL}/providers/${id}/status`,
    delete: (id) => `${API_URL}/providers/${id}`,
    search: `${API_URL}/providers/search`,
  },
};

export const apiCall = async (endpoint, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(endpoint, {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  });

  if (!response.ok) {
    throw new Error(await response.text() || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};