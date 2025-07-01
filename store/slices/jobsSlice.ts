import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { JobsState, JobsResponse } from '@/types/job.types';
import { jobsService } from '@/services/jobs.service';
import { PaginationParams } from '@/types/api.types';

const initialState: JobsState = {
  jobs: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  isLoading: false,
  error: null,
  filters: {},
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params: PaginationParams & { filters?: JobsState['filters'] }, { rejectWithValue }) => {
    try {
      const response = await jobsService.getJobs(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch jobs');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<JobsState['filters']>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setFilters, clearFilters, setCurrentPage } = jobsSlice.actions;
export default jobsSlice.reducer;