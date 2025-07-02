'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, CircularProgress } from '@mui/material';
import { fetchJobs, setCurrentPage } from '../store/slices/jobsSlice';
import { AppDispatch, RootState, useAppSelector } from '../store';
import { Job, JobsState } from '../types/job.types';

// SVG Icons as components
const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Company logo mapping
const getCompanyLogo = (id: string) => {
  if (Number(id) % 2 === 0) {
    return `images/2.png`;
  } else if (Number(id) % 3 === 0) {
    return `images/3.png`;
  } else if (Number(id) % 5 === 0) {
    return `images/5.png`;
  } else if (Number(id) % 7 === 0) {
    return `images/7.png`;
  }
  else return 'images/2.png';
};

// Flag mapping for countries
const getFlagEmoji = (location: string) => {
  if (location.includes('Dubai') || location.includes('Sharjah')) return '🇦🇪';
  if (location.includes('India') || location.includes('Delhi')) return '🇮🇳';
  if (location.includes('England') || location.includes('Birmingham')) return '🇬🇧';
  if (location.includes('US') || location.includes('California')) return '🇺🇸';
  if (location.includes('Australia') || location.includes('Perth')) return '🇦🇺';
  return '';
};

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   location: string;
//   is_active: boolean;
//   experience: string;
//   postedTime: string;
//   logo?: string;
// }

const Dashboard = () => {
  const dispatch = useDispatch();
  const { 
    jobs, 
    totalPages, 
    currentPage, 
    hasNextPage, 
    hasPreviousPage, 
    isLoading, 
    error 
  } = useAppSelector((state: RootState) => state.jobs);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchJobsWithFilters = useCallback(
    (filters: JobsState['filters']) => {
      dispatch((fetchJobs({ page: currentPage, limit: 10, filters }) as any)).unwrap();
    },
    [dispatch, currentPage]
  );

  useEffect(() => {
    fetchJobsWithFilters({});
    // dispatch((fetchJobs({filters: {search : "", location: ""}, page: currentPage, limit: 10 }) as any)).unwrap();
  }, [dispatch, currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  const handleJobClick = (jobId: string) => {
    // Handle job click navigation
    console.log('Job clicked:', jobId);
  };

  const handleBookmark = (jobId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // Handle bookmark logic
    console.log('Bookmark clicked:', jobId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
          <button 
            onClick={() => fetchJobsWithFilters({})}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold text-blue-900">Job Portal</h1>
            <button 
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-6">Available jobs</h2>
          
          {/* Jobs List */}
          <div className="space-y-4">
            {jobs.map((job: Job) => (
              <div
                key={job.id}
                onClick={() => handleJobClick(job.id)}
                className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <Image
                          src={getCompanyLogo(job.id)}
                          alt={`${job?.title} logo`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to colored background with company initial
                            const target = e.target as HTMLElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-white font-semibold text-lg">${getCompanyLogo(job.id)}</span>`;
                              parent.className += getCompanyLogo(job.id) === 'images/2.png' ? ' bg-red-500' :
                                                getCompanyLogo(job.id) === 'images/3.png' ? ' bg-blue-500' :
                                                getCompanyLogo(job.id) === 'images/5.png' ? ' bg-green-500' :
                                                getCompanyLogo(job.id) === 'images/7.png' ? ' bg-gray-800' : ' bg-gray-400';
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {job.title}
                        </h3>
                        {job.is_active && (
                          <span className="inline-flex items-center">
                            <HomeIcon />
                            <span className="ml-1 text-sm text-gray-600">Remote</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-blue-600 font-medium">{"Company name"}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600 text-sm">Posted: {`${job.date_posted}`}</span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Experience: {job.description}</span>
                        {!job.is_active && (
                          <div className="flex items-center space-x-1">
                            <span>{getFlagEmoji(job.location)}</span>
                            <span>{job.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 ml-4">
                    <button
                      onClick={(e) => handleBookmark(job.id, e)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Bookmark job"
                    >
                      <BookmarkIcon />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobClick(job.id);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="View job details"
                    >
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? "small" : "medium"}
                showFirstButton
                showLastButton
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-2"
              />
            </div>
          )}

          {/* Empty State */}
          {jobs.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">There are no available jobs at the moment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;