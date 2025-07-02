import { LoginCredentials, AuthResponse, User, UserData } from '@/types/auth.types';
import { apiService } from './api';

class AuthService {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<{ data: UserData, status : string, token: string, message: string }>('/users/login', credentials);
    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await apiService.post('/users/logout');
  }

  /**
   * Verify token and get user info
   */
  async verifyToken(token: string): Promise<User> {
    const response = await apiService.get<{ data: User }>('/users/verify');
    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiService.post<{ data: AuthResponse }>('/users/refresh', {
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
    const response = await apiService.post<{ data: AuthResponse }>('/users/register', userData);
    return response.data;
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await apiService.post('/users/forgot-password', { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiService.post('/users/reset-password', { token, password: newPassword });
  }
}

export const authService = new AuthService();