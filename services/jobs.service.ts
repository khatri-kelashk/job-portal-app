import { JobsResponse, Job, JobData } from '../types/job.types';
import { PaginationParams } from '../types/api.types';
import { apiService } from './api';

interface JobsQueryParams extends PaginationParams {
  search?: string;
  location?: string;
  is_active?: boolean;
}

class JobsService {
  /**
   * Get paginated list of jobs
   */
  async getJobs(params: JobsQueryParams): Promise<JobsResponse> {
    const response = await apiService.get<{ data: JobData, status: string, message: string }>('/jobs', params);
    return response;
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

}

export const jobsService = new JobsService();