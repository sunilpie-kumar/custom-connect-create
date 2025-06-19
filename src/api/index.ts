
/**
 * Legacy API support - Updated to use new structure
 * This file maintains backward compatibility while redirecting to new API service
 */

import { apiService, ApiResponse } from '@/services/apiService';
import { API_ENDPOINTS } from '@/config/apiEndpoints';

// Re-export the new API endpoints for backward compatibility
export const apiEndpoints = {
  auth: {
    register: API_ENDPOINTS.auth.register.url,
    sendOTP: API_ENDPOINTS.auth.sendOTP.url,
    verifyOTP: API_ENDPOINTS.auth.verifyOTP.url,
  },
  users: {
    getUser: (id: string) => API_ENDPOINTS.users.getUser.url(id),
    updateUser: (id: string) => API_ENDPOINTS.users.updateUser.url(id),
  },
  messages: {
    getMessages: API_ENDPOINTS.messages.getMessages.url,
    sendMessage: API_ENDPOINTS.messages.sendMessage.url,
    getMessage: (id: string) => API_ENDPOINTS.messages.getMessage.url(id),
  },
  providers: {
    register: API_ENDPOINTS.providers.register.url,
    getAll: API_ENDPOINTS.providers.getAll.url,
    getById: (id: string) => API_ENDPOINTS.providers.getById.url(id),
    update: (id: string) => API_ENDPOINTS.providers.update.url(id),
    updateStatus: (id: string) => API_ENDPOINTS.providers.updateStatus.url(id),
    delete: (id: string) => API_ENDPOINTS.providers.delete.url(id),
    search: API_ENDPOINTS.providers.search.url,
  },
};

// Legacy apiCall function - redirects to new API service
export const apiCall = async (
  endpoint: string, 
  method: string = 'GET', 
  data: any = null, 
  token: string | null = null
): Promise<ApiResponse> => {
  console.warn('apiCall is deprecated. Please use apiService methods instead.');
  
  try {
    switch (method.toUpperCase()) {
      case 'GET':
        return await apiService.get(endpoint, data);
      case 'POST':
        return await apiService.post(endpoint, data);
      case 'PUT':
        return await apiService.put(endpoint, data);
      case 'PATCH':
        return await apiService.patch(endpoint, data);
      case 'DELETE':
        return await apiService.delete(endpoint);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  } catch (error) {
    throw error;
  }
};

// Re-export the new API service for modern usage
export { apiService } from '@/services/apiService';
export { API_ENDPOINTS } from '@/config/apiEndpoints';
export { APP_PATHS } from '@/config/paths';
