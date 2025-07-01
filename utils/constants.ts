export const APP_CONFIG = {
  name: 'JobPortal',
  version: '1.0.0',
  description: 'Professional job search platform',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
  },
  JOBS: {
    LIST: '/jobs',
    SEARCH: '/jobs/search',
    FEATURED: '/jobs/featured',
    CATEGORIES: '/jobs/categories',
    LOCATIONS: '/jobs/locations',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  DEFAULT_PAGE: 1,
} as const;

export const JOB_TYPES = [
  'full-time',
  'part-time',
  'contract',
  'freelance',
] as const;

export const EXPERIENCE_LEVELS = [
  'entry',
  'mid',
  'senior',
  'lead',
] as const;

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
} as const;

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  TOAST_DURATION: 5000,
  MOBILE_BREAKPOINT: 768,
} as const;