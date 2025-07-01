import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/store';
import { loginUser, logoutUser, checkAuthStatus, clearError } from '@/store/slices/authSlice';
import { LoginCredentials } from '@/types/auth.types';
import { ROUTES } from '@/utils/constants';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
  } = useSelector((state: RootState) => state.auth);

  /**
   * Login user with credentials
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      const result = await dispatch(loginUser(credentials));
      if (loginUser.fulfilled.match(result)) {
        router.push(ROUTES.DASHBOARD);
        return { success: true };
      } else {
        return { success: false, error: result.payload as string };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await dispatch(logoutUser());
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * Check authentication status on app load
   */
  const checkAuth = async () => {
    try {
      await dispatch(checkAuthStatus());
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  /**
   * Clear authentication error
   */
  const clearAuthError = () => {
    dispatch(clearError());
  };

  /**
   * Redirect to login if not authenticated
   */
  const requireAuth = () => {
    if (!isAuthenticated && !isLoading) {
      router.push(ROUTES.LOGIN);
    }
  };

  /**
   * Redirect to dashboard if already authenticated
   */
  const redirectIfAuthenticated = () => {
    if (isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  };

  return {
    // State
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    
    // Actions
    login,
    logout,
    checkAuth,
    clearAuthError,
    requireAuth,
    redirectIfAuthenticated,
  };
};
