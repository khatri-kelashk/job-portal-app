export interface Job {
  id: string;
  job_title: string;
  job_type: string;
  location: string;
  organization: string;
  description: string;
  modified_on: Date;
  created_on: Date;
  is_active: boolean;
  years_of_experience: number;
}
export interface JobData {
    Jobs: Job[];
}

export interface JobsResponse {
  status: string;
  data: JobData;
  message: string;
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface JobsState {
  jobs: Job[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  error: string | null;
  filters: {
    search?: string;
    location?: string;
  };
}