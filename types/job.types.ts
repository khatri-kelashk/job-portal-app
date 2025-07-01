export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  postedAt: string;
  expiresAt?: string;
  isRemote: boolean;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
}

export interface JobsResponse {
  jobs: Job[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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
    type?: Job['type'];
    location?: string;
    experienceLevel?: Job['experienceLevel'];
  };
}