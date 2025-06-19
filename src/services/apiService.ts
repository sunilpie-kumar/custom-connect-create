
/**
 * API Service Layer
 * Centralized API call management with error handling and request/response interceptors
 */

import { API_ENDPOINTS } from '@/config/apiEndpoints';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ msg: string; field?: string }>;
  pagination?: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Array<{ msg: string; field?: string }>;
}

class ApiService {
  private baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  /**
   * Get authorization headers with token
   */
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      ...this.baseHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Handle API response and errors
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      if (contentType && contentType.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          throw new Error(JSON.stringify(errorData));
        } catch (parseError) {
          throw new Error(errorMessage);
        }
      } else {
        const errorText = await response.text();
        throw new Error(errorText || errorMessage);
      }
    }

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return { success: true, data: {} as T };
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      let url = endpoint;
      
      if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });
        const queryString = searchParams.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  }

  /**
   * Generic POST request
   */
  async post<T>(endpoint: string, data?: any, useFormData = false): Promise<ApiResponse<T>> {
    try {
      const headers = useFormData ? 
        { Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '' } :
        this.getAuthHeaders();

      const body = useFormData ? data : JSON.stringify(data);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        ...(data && { body }),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  }

  /**
   * Generic PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        ...(data && { body: JSON.stringify(data) }),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        ...(data && { body: JSON.stringify(data) }),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('PATCH request error:', error);
      throw error;
    }
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  }

  // Specific API methods using the endpoints configuration

  /**
   * Authentication APIs
   */
  auth = {
    register: (userData: any) => this.post(API_ENDPOINTS.auth.register.url, userData),
    sendOTP: (phone: string) => this.post(API_ENDPOINTS.auth.sendOTP.url, { phone }),
    verifyOTP: (phone: string, otp: string) => this.post(API_ENDPOINTS.auth.verifyOTP.url, { phone, otp }),
  };

  /**
   * Provider APIs
   */
  providers = {
    register: (providerData: any) => this.post(API_ENDPOINTS.providers.register.url, providerData),
    getAll: (params?: any) => this.get(API_ENDPOINTS.providers.getAll.url, params),
    getById: (id: string) => this.get(API_ENDPOINTS.providers.getById.url(id)),
    update: (id: string, data: any) => this.put(API_ENDPOINTS.providers.update.url(id), data),
    updateStatus: (id: string, status: string) => this.patch(API_ENDPOINTS.providers.updateStatus.url(id), { status }),
    delete: (id: string) => this.delete(API_ENDPOINTS.providers.delete.url(id)),
    search: (params: any) => this.get(API_ENDPOINTS.providers.search.url, params),
  };

  /**
   * Business Provider APIs
   */
  business = {
    register: (businessData: any, files?: File[]) => {
      const formData = new FormData();
      Object.entries(businessData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      if (files) {
        files.forEach(file => formData.append('files', file));
      }
      return this.post(API_ENDPOINTS.business.register.url, formData, true);
    },
    getProfile: (id: string) => this.get(API_ENDPOINTS.business.getProfile.url(id)),
    update: (id: string, data: any, files?: File[]) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      if (files) {
        files.forEach(file => formData.append('files', file));
      }
      return this.put(API_ENDPOINTS.business.update.url(id), formData);
    },
    getDashboard: (id: string) => this.get(API_ENDPOINTS.business.getDashboard.url(id)),
  };

  /**
   * Booking APIs
   */
  bookings = {
    create: (bookingData: any) => this.post(API_ENDPOINTS.bookings.create.url, bookingData),
    getAll: (params?: any) => this.get(API_ENDPOINTS.bookings.getAll.url, params),
    getById: (id: string) => this.get(API_ENDPOINTS.bookings.getById.url(id)),
    updateStatus: (id: string, status: string) => this.put(API_ENDPOINTS.bookings.updateStatus.url(id), { status }),
  };

  /**
   * Message APIs
   */
  messages = {
    getMessages: (params?: any) => this.get(API_ENDPOINTS.messages.getMessages.url, params),
    sendMessage: (messageData: any) => this.post(API_ENDPOINTS.messages.sendMessage.url, messageData),
    getMessage: (id: string) => this.get(API_ENDPOINTS.messages.getMessage.url(id)),
  };
}

export const apiService = new ApiService();
export default apiService;
