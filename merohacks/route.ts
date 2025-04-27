// app/lib/route.ts (or a similar file)

/**
 * An Array of routes that are accessible to the public. These
 * routes do not require authentication
 */
export const PublicRoutes = [
    "/",
    "/auth/new-verification",
  ];
  
  export const authRoutes = [
    // Thesee are the routes wh
    // These routes will redirect logged in users to home
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
    '/auth/new-password'
  ];
  
  export const apiAuthPrefix = '/api/auth'; // All of the people
  export const DEFAULT_LOGIN_REDIRECT = "/home";








