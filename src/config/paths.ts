
/**
 * Application Paths Configuration
 * Centralized management of all application routes and navigation paths
 */

export const APP_PATHS = {
  // Public routes
  home: '/',
  services: '/services',
  about: '/about',
  contact: '/contact',
  
  // Authentication routes
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },

  // User dashboard routes
  dashboard: {
    main: '/dashboard',
    profile: '/dashboard/profile',
    bookings: '/dashboard/bookings',
    messages: '/dashboard/messages',
    settings: '/dashboard/settings',
  },

  // Provider routes
  providers: {
    list: '/providers',
    profile: (id: string) => `/providers/${id}`,
    register: '/providers/register',
    dashboard: '/providers/dashboard',
    bookings: '/providers/bookings',
    analytics: '/providers/analytics',
  },

  // Business routes
  business: {
    register: '/business/register',
    profile: (id: string) => `/business/${id}`,
    dashboard: '/business/dashboard',
    services: '/business/services',
    bookings: '/business/bookings',
    analytics: '/business/analytics',
  },

  // Booking routes
  bookings: {
    create: '/bookings/create',
    list: '/bookings',
    details: (id: string) => `/bookings/${id}`,
    history: '/bookings/history',
  },

  // Admin routes
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    providers: '/admin/providers',
    businesses: '/admin/businesses',
    bookings: '/admin/bookings',
    analytics: '/admin/analytics',
    settings: '/admin/settings',
  },

  // Service category routes
  categories: {
    houseDecor: '/services/house-decor',
    automobile: '/services/automobile',
    gifts: '/services/gifts',
    womenWear: '/services/women-wear',
    construction: '/services/construction',
    technology: '/services/technology',
    otherServices: '/services/other-services',
  },

  // Legal and info pages
  legal: {
    privacy: '/privacy-policy',
    terms: '/terms-of-service',
    refund: '/refund-policy',
    faq: '/faq',
  },

  // Error pages
  errors: {
    notFound: '/404',
    serverError: '/500',
    unauthorized: '/401',
    forbidden: '/403',
  },
} as const;

/**
 * External URLs
 */
export const EXTERNAL_URLS = {
  support: 'mailto:support@kustom.com',
  documentation: 'https://docs.kustom.com',
  socialMedia: {
    facebook: 'https://facebook.com/kustom',
    twitter: 'https://twitter.com/kustom',
    instagram: 'https://instagram.com/kustom',
    linkedin: 'https://linkedin.com/company/kustom',
  },
} as const;

/**
 * API Base URLs (for different environments)
 */
export const API_BASE_URLS = {
  development: 'http://localhost:5002/api/v1',
  staging: 'https://api-staging.kustom.com/v1',
  production: 'https://api.kustom.com/v1',
} as const;

/**
 * Navigation Menu Configuration
 */
export const NAVIGATION_MENUS = {
  main: [
    { label: 'Home', path: APP_PATHS.home },
    { label: 'Services', path: APP_PATHS.services },
    { label: 'Providers', path: APP_PATHS.providers.list },
    { label: 'Business', path: APP_PATHS.business.register },
  ],
  
  userDashboard: [
    { label: 'Dashboard', path: APP_PATHS.dashboard.main },
    { label: 'My Bookings', path: APP_PATHS.dashboard.bookings },
    { label: 'Messages', path: APP_PATHS.dashboard.messages },
    { label: 'Profile', path: APP_PATHS.dashboard.profile },
  ],
  
  providerDashboard: [
    { label: 'Dashboard', path: APP_PATHS.providers.dashboard },
    { label: 'Bookings', path: APP_PATHS.providers.bookings },
    { label: 'Analytics', path: APP_PATHS.providers.analytics },
  ],
  
  businessDashboard: [
    { label: 'Dashboard', path: APP_PATHS.business.dashboard },
    { label: 'Services', path: APP_PATHS.business.services },
    { label: 'Bookings', path: APP_PATHS.business.bookings },
    { label: 'Analytics', path: APP_PATHS.business.analytics },
  ],
} as const;

export default APP_PATHS;
