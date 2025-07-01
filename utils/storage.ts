/**
 * Browser storage utilities with error handling
 */
class StorageService {
  private isClient = typeof window !== 'undefined';

  /**
   * Store authentication token
   */
  setToken(token: string): void {
    if (!this.isClient) return;
    
    try {
      localStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  /**
   * Retrieve authentication token
   */
  getToken(): string | null {
    if (!this.isClient) return null;
    
    try {
      return localStorage.getItem('auth_token');
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  /**
   * Remove authentication token
   */
  removeToken(): void {
    if (!this.isClient) return;
    
    try {
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }

  /**
   * Store user preferences
   */
  setUserPreferences(preferences: Record<string, any>): void {
    if (!this.isClient) return;
    
    try {
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to store preferences:', error);
    }
  }

  /**
   * Retrieve user preferences
   */
  getUserPreferences(): Record<string, any> | null {
    if (!this.isClient) return null;
    
    try {
      const preferences = localStorage.getItem('user_preferences');
      return preferences ? JSON.parse(preferences) : null;
    } catch (error) {
      console.error('Failed to retrieve preferences:', error);
      return null;
    }
  }

  /**
   * Clear all stored data
   */
  clearAll(): void {
    if (!this.isClient) return;
    
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_preferences');
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
}

export const storage = new StorageService();