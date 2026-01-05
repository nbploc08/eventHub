// ========================
// ROUTER CONSTANTS
// ========================

export const ROUTERS = {
  // User Routes
  USER: {
    HOME: '/pages/user/home',
    TEST: '/pages/user/test',
    PRODUCTS: '/pages/user/products',
    CART: '/pages/user/cart',
    PROFILE: '/pages/user/profile',
    ORDERS: '/pages/user/orders',
    CONTACT: '/pages/user/contact',
  },
  
  // Admin Routes  
  ADMIN: {
    HOME: '/pages/admin/home',
    DASHBOARD: '/pages/admin/dashboard',
    PRODUCTS: '/pages/admin/products',
    ORDERS: '/pages/admin/orders',
    CUSTOMERS: '/pages/admin/customers',
    REPORTS: '/pages/admin/reports',
    SETTINGS: '/pages/admin/settings',
  },

  // Public Routes (Clean URLs)
  PUBLIC: {
    HOME: '/',
    TEST: '/test',
    ADMIN_PANEL: '/admin',
    PRODUCTS: '/products',
    CART: '/cart',
    CONTACT: '/contact',
    LOGIN: '/login',
    REGISTER: '/register',
  },
} as const;

// ========================
// API CONSTANTS
// ========================

export const API_ENDPOINTS = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.minishop.com' 
    : 'http://localhost:4301',
    
  USER: {
    HOME: '/user/home',
    PROFILE: '/user/profile',
    ORDERS: '/user/orders',
  },
  
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    CUSTOMERS: '/admin/customers',
  },
  
  COMMON: {
    SHARE: '/common/share',
  },
} as const;

// ========================
// APP CONSTANTS
// ========================

export const APP_CONFIG = {
  NAME: 'MiniShop',
  DESCRIPTION: 'Cửa hàng tạp hóa mini',
  VERSION: '1.0.0',
  AUTHOR: 'MiniShop Team',
  
  // Ports
  FRONTEND_PORT: 4300,
  BACKEND_PORT: 4301,
  
  // SEO
  DEFAULT_TITLE: 'MiniShop - Cửa hàng tạp hóa mini',
  DEFAULT_DESCRIPTION: 'Website quản lý cửa hàng tạp hóa mini với Next.js và TypeScript',
  DEFAULT_KEYWORDS: ['cửa hàng', 'tạp hóa', 'mini', 'quản lý', 'bán hàng', 'Next.js'],
} as const;

// ========================
// TYPE DEFINITIONS
// ========================

export type UserRoutes = typeof ROUTERS.USER[keyof typeof ROUTERS.USER];
export type AdminRoutes = typeof ROUTERS.ADMIN[keyof typeof ROUTERS.ADMIN];
export type PublicRoutes = typeof ROUTERS.PUBLIC[keyof typeof ROUTERS.PUBLIC];
