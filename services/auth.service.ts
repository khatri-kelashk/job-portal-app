import { LoginCredentials, AuthResponse, User } from '@/types/auth.types';
import { apiService } from './api';

class AuthService {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<{ data: AuthResponse }>('/auth/login', credentials);
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await apiService.post('/auth/logout');
  }

  /**
   * Verify token and get user info
   */
  async verifyToken(token: string): Promise<User> {
    const response = await apiService.get<{ data: User }>('/auth/verify');
    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiService.post<{ data: AuthResponse }>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  }

  /**
   * Register new user
   */
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const response = await apiService.post<{ data: AuthResponse }>('/auth/register', userData);
    return response.data;
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await apiService.post('/auth/forgot-password', { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiService.post('/auth/reset-password', { token, password: newPassword });
  }
}

export const authService = new AuthService();