export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    spacing: {
      '18': '4.5rem',
      '88': '22rem',
    },
    animation: {
      'spin-slow': 'spin 1.5s linear infinite',
      'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }
  },
};
export const plugins = [];