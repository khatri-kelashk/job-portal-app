export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  date_posted: Date;
  is_active: boolean;
}
export interface JobData {
    jobs: Job[];
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