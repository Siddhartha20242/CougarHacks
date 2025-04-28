// app/protected/home/Navbar.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { FaBars, FaTimes, FaRegLightbulb, FaQuestionCircle, FaUserMd, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className="bg-white text-gray-800 w-full py-4 shadow-md fixed top-0 z-50 border-b border-gray-200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
       
        <Link href="/home" className="text-xl md:text-2xl font-bold tracking-tight text-indigo-600">
          Cougar Health
        </Link>

       
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <NavLink href="/ai">
            <FaRegLightbulb className="h-4 w-4 inline mr-2" />
            AI Solutions
          </NavLink>
          <NavLink href="/quizzes">
            <FaQuestionCircle className="h-4 w-4 inline mr-2" />
            Quizzes
          </NavLink>
          <NavLink href="/experts">
            <FaUserMd className="h-4 w-4 inline mr-2" />
            Expert Connect
          </NavLink>
          <NavLink href="/settings">
            <FaCog className="h-4 w-4 inline mr-2" />
            Settings
          </NavLink>
        </div>

      
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold hidden sm:inline">
                Hello, {session.user?.name?.split(' ')[0] || session.user?.email?.split('@')[0] || 'User'}
              </span>
              <motion.button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Out
              </motion.button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-200"
            >
              Log In
            </Link>
          )}

         
          <button onClick={toggleMobileMenu} className="md:hidden focus:outline-none">
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6 text-gray-600" />
            ) : (
              <FaBars className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="py-4 px-6 flex flex-col space-y-3">
          <Link href="/ai" className="text-lg hover:text-indigo-600 flex items-center">
            <FaRegLightbulb className="h-5 w-5 mr-2" />AI Solutions
          </Link>
          <Link href="/quizzes" className="text-lg hover:text-indigo-600 flex items-center">
            <FaQuestionCircle className="h-5 w-5 mr-2" />Quizzes
          </Link>
          <Link href="/experts" className="text-lg hover:text-indigo-600 flex items-center">
            <FaUserMd className="h-5 w-5 mr-2" />Expert Connect
          </Link>
          <Link href="/settings" className="text-lg hover:text-indigo-600 flex items-center">
            <FaCog className="h-5 w-5 mr-2" />Settings
          </Link>
          {session ? (
            <button onClick={() => signOut()} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-200">
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-200 text-center">
              Log In
            </Link>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};


const NavLink = ({ href, children }: any) => (
  <Link
    href={href}
    className="text-lg hover:text-indigo-600 transition duration-300 flex items-center"
  >
    <motion.span whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.span>
  </Link>
);

export default Navbar;