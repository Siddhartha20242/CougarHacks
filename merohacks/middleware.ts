import NextAuth from 'next-auth';       // This is for authentication
import authConfig from "./auth.config"; // This file contains settings for NextAuth such as: 
// NextAuth, 

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    PublicRoutes
} from './route';



const { auth } = NextAuth(authConfig);  // This line initializes NextAuth by calling the NextAuth function

export default auth((req) => {
    const { nextUrl } = req;        // It asbtracts the nedxtUrl object from the req object. nextUrl provides information about the requested URL,
    const isLoggedIn = !!req.auth;      // This line checks if the user is already logged in or not. The double !! converts the login to be true otherwise fasles

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);      // This line checks if the requested path(nextUrl.pathname) starts with the apiAithprefix.
    const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }
    if (!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl));
    } // Add a default return here to satisfy the type checker

    return null;
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};

// So, here we are trying to implement a crucial security layer for our application. It intercepts incoming requestts, checks the user's authentication status and the requested route,
// and then either allows access, redirects to the login page, or redirects away from the authentication
// pages for logged-in users. The matcher ensures that the logic is applied to the appropriate parts of our application