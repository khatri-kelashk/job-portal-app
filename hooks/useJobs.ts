import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import {
  fetchJobs,
  clearError,
  setFilters,
  clearFilters,
  setCurrentPage,
} from '@/store/slices/jobsSlice';
import { JobsState } from '@/types/job.types';
import { PAGINATION } from '@/utils/constants';

interface UseJobsOptions {
  autoFetch?: boolean;
  pageSize?: number;
}

export const useJobs = (options: UseJobsOptions = {}) => {
  const { autoFetch = true, pageSize = PAGINATION.DEFAULT_PAGE_SIZE } = options;
  
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    jobs,
    totalCount,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    error,
    filters,
  } = useSelector((state: RootState) => state.jobs);

  /**
   * Fetch jobs with current filters and pagination
   */
  const loadJobs = useCallback(async (page?: number) => {
    const targetPage = page || currentPage;
    
    try {
      await dispatch(fetchJobs({
        page: targetPage,
        limit: pageSize,
        filters,
      }));
    } catch (error) {
      console.error('Failed to load jobs:', error);
    }
  }, [dispatch, currentPage, pageSize, filters]);

  /**
   * Go to specific page
   */
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      dispatch(setCurrentPage(page));
      loadJobs(page);
    }
  }, [dispatch, totalPages, currentPage, loadJobs]);

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [hasNextPage, currentPage, goToPage]);

  /**
   * Go to previous page
   */
  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      goToPage(currentPage - 1);
    }
  }, [hasPreviousPage, currentPage, goToPage]);

  /**
   * Update filters and reload jobs
   */
  const updateFilters = useCallback((newFilters: Partial<JobsState['filters']>) => {
    dispatch(setFilters(newFilters));
    dispatch(setCurrentPage(1)); // Reset to first page when filters change
    
    // Reload jobs with new filters
    setTimeout(() => {
      loadJobs(1);
    }, 0);
  }, [dispatch, loadJobs]);

  /**
   * Clear all filters and reload jobs
   */
  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
    dispatch(setCurrentPage(1));
    
    // Reload jobs without filters
    setTimeout(() => {
      loadJobs(1);
    }, 0);
  }, [dispatch, loadJobs]);

  /**
   * Refresh jobs (reload current page)
   */
  const refreshJobs = useCallback(() => {
    loadJobs(currentPage);
  }, [loadJobs, currentPage]);

  /**
   * Clear jobs error
   */
  const clearJobsError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Search jobs with query
   */
  const searchJobs = useCallback((query: string) => {
    updateFilters({ search: query });
  }, [updateFilters]);

  // Auto-fetch jobs on mount
  useEffect(() => {
    if (autoFetch && jobs.length === 0 && !isLoading) {
      loadJobs();
    }
  }, [autoFetch, jobs.length, isLoading, loadJobs]);

  return {
    // State
    jobs,
    totalCount,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    error,
    filters,
    
    // Actions
    loadJobs,
    goToPage,
    nextPage,
    previousPage,
    updateFilters,
    resetFilters,
    refreshJobs,
    clearJobsError,
    searchJobs,
    
    // Computed values
    isEmpty: !isLoading && jobs.length === 0,
    hasJobs: jobs.length > 0,
    pageInfo: {
      current: currentPage,
      total: totalPages,
      size: pageSize,
      showing: {
        from: Math.min((currentPage - 1) * pageSize + 1, totalCount),
        to: Math.min(currentPage * pageSize, totalCount),
        total: totalCount,
      },
    },
  };
};
