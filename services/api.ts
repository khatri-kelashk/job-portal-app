import { ApiRequestConfig, ApiResponse, ApiError } from '@/types/api.types';
import { storage } from '@/utils/storage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Generic API request method
   */
  private async request<T = any>(config: ApiRequestConfig): Promise<T> {
    const { method, url, data, params, headers = {} } = config;
    
    // Add authorization header if token exists
    const token = storage.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Add default headers
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    // Build URL with query parameters
    const fullURL = new URL(`${this.baseURL}${url}`);
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          fullURL.searchParams.append(key, params[key].toString());
        }
      });
    }

    try {
      const response = await fetch(fullURL.toString(), {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: ApiError = {
          message: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          code: errorData.code || response.status.toString(),
          details: errorData.details,
        };
        throw error;
      }

      // Parse response
      const responseData = await response.json();
      
      // Check if the API response indicates an error
      if (responseData.success === false) {
        const error: ApiError = {
          message: responseData.message || 'API request failed',
          code: responseData.code || 'API_ERROR',
          details: responseData.details,
        };
        throw error;
      }

      return responseData;
    } catch (error: any) {
      // Network or parsing errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw {
          message: 'Network error. Please check your connection.',
          code: 'NETWORK_ERROR',
        } as ApiError;
      }
      
      // Re-throw API errors
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>({ method: 'GET', url, params });
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'POST', url, data });
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', url });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any): Promise<T> {
    return this.request<T>({ method: 'PATCH', url, data });
  }
}

export const apiService = new ApiService(API_BASE_URL);