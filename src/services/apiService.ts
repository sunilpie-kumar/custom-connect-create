
/**
 * API Service Layer
 * Centralized API call management with error handling and request/response interceptors
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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
  exists?: boolean;
  provider?: any;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Array<{ msg: string; field?: string }>;
}

class ApiService {
  private baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  /**
   * Get authorization headers with token
   */
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
      ...this.baseHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Handle API response and errors
   */
  private handleResponse<T>(response: AxiosResponse): ApiResponse<T> {
    return response.data;
  }

  /**
   * Handle axios errors
   */
  private handleError(error: any): never {
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data;
      const errorMessage = errorData?.message || `HTTP error! status: ${error.response.status}`;
      throw new Error(JSON.stringify(errorData || { message: errorMessage }));
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response received');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      const config: AxiosRequestConfig = {
        method: 'GET',
        headers: this.getAuthHeaders(),
        params,
      };

      const response = await axios(endpoint, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('GET request error:', error);
      this.handleError(error);
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

      const config: AxiosRequestConfig = {
        method: 'POST',
        headers,
        data,
      };

      const response = await axios(endpoint, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST request error:', error);
      this.handleError(error);
    }
  }

  /**
   * Generic PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const config: AxiosRequestConfig = {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        data,
      };

      const response = await axios(endpoint, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('PUT request error:', error);
      this.handleError(error);
    }
  }

  /**
   * Generic PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const config: AxiosRequestConfig = {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        data,
      };

      const response = await axios(endpoint, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('PATCH request error:', error);
      this.handleError(error);
    }
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const config: AxiosRequestConfig = {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      };

      const response = await axios(endpoint, config);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('DELETE request error:', error);
      this.handleError(error);
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
    checkPhone: (phone: string) =>
      this.get<{ exists: boolean; provider: any }>(API_ENDPOINTS.providers.checkPhone.url, { phone }),
    verifyOTP: (phone: string, otp: string) =>
      this.post<{ success: boolean; message?: string }>(
        `${API_ENDPOINTS.providers.register.url.replace('/providers', '/providers/verify-otp')}`,
        { phone, otp }
      ),
  };

  /**
   * Business Provider APIs
   */
  business = {
    register: (businessData: any, files?: File[]) => {
      if (files && files.length > 0) {
        const formData = new FormData();
        Object.entries(businessData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });
        files.forEach(file => formData.append('files', file));
        return this.post(API_ENDPOINTS.business.register.url, formData, true);
      } else {
        // Send as JSON if no files
        return this.post(API_ENDPOINTS.business.register.url, businessData);
      }
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

  /**
   * OTP APIs (WhatsApp via Twilio)
   */
  otp = {
    send: (phoneNumber: string) =>
      this.post<{ success: boolean; message?: string }>(
        API_ENDPOINTS.otp.send.url,
        { phoneNumber }
      ),
    verify: (phoneNumber: string, code: string) =>
      this.post<{ success: boolean; message?: string }>(
        API_ENDPOINTS.otp.verify.url,
        { phoneNumber, code }
      ),
    status: () =>
      this.get<{ success: boolean; data: any }>(
        API_ENDPOINTS.otp.status.url
      ),
  };
}

export const apiService = new ApiService();
export default apiService;