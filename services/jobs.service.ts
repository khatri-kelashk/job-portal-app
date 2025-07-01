import { JobsResponse, Job } from '../types/job.types';
import { PaginationParams } from '@/types/api.types';
import { apiService } from './api';

interface JobsQueryParams extends PaginationParams {
  search?: string;
  type?: Job['type'];
  location?: string;
  experienceLevel?: Job['experienceLevel'];
  isRemote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
}

class JobsService {
  /**
   * Get paginated list of jobs
   */
  async getJobs(params: JobsQueryParams): Promise<JobsResponse> {
    const response = await apiService.get<{ data: JobsResponse }>('/jobs', params);
    return response.data;
  }

  /**
   * Get single job by ID
   */
  async getJobById(id: string): Promise<Job> {
    const response = await apiService.get<{ data: Job }>(`/jobs/${id}`);
    return response.data;
  }

  /**
   * Search jobs with text query
   */
  async searchJobs(query: string, params?: Omit<JobsQueryParams, 'search'>): Promise<JobsResponse> {
    const response = await apiService.get<{ data: JobsResponse }>('/jobs/search', {
      q: query,
      ...params,
    });
    return response.data;
  }

  /**
   * Get featured/recommended jobs
   */
  async getFeaturedJobs(limit = 10): Promise<Job[]> {
    const response = await apiService.get<{ data: Job[] }>('/jobs/featured', { limit });
    return response.data;
  }

  /**
   * Get job categories/types
   */
  async getJobCategories(): Promise<string[]> {
    const response = await apiService.get<{ data: string[] }>('/jobs/categories');
    return response.data;
  }

  /**
   * Get popular locations
   */
  async getPopularLocations(): Promise<string[]> {
    const response = await apiService.get<{ data: string[] }>('/jobs/locations');
    return response.data;
  }

  /**
   * Apply to a job (if applying functionality is needed)
   */
  async applyToJob(jobId: string, applicationData: {
    coverLetter?: string;
    resumeUrl?: string;
  }): Promise<void> {
    await apiService.post(`/jobs/${jobId}/apply`, applicationData);
  }

  /**
   * Save/bookmark a job
   */
  async saveJob(jobId: string): Promise<void> {
    await apiService.post(`/jobs/${jobId}/save`);
  }

  /**
   * Remove job from saved list
   */
  async unsaveJob(jobId: string): Promise<void> {
    await apiService.delete(`/jobs/${jobId}/save`);
  }

  /**
   * Get user's saved jobs
   */
  async getSavedJobs(params?: PaginationParams): Promise<JobsResponse> {
    const response = await apiService.get<{ data: JobsResponse }>('/jobs/saved', params);
    return response.data;
  }
}

export const jobsService = new JobsService();