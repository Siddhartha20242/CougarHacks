// app/protected/home/page.tsx
"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useCurrentUser } from "@/hooks/use-current-user";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { signOut } from "next-auth/react";
import { motion } from 'framer-motion';
import {
  FaCog, FaUserAlt,
  FaSmile, FaChartLine, FaRegLightbulb, FaQuestionCircle, FaUserMd,
  FaExclamationTriangle
} from 'react-icons/fa';
import Link from 'next/link';

// Card variants for animations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const happyQuotes = [
  "The best is yet to come.",
  "Happiness is a state of mind.",
  "Every day is a fresh start.",
  "Smile, it increases your face value.",
  "Enjoy the little things.",
  "Be the sunshine.",
  "Good vibes only.",
  "Live, laugh, love.",
  "Today is a good day.",
  "Choose joy.",
  "Happiness looks gorgeous on you.",
  "Make your own sunshine.",
  "The secret to happiness is freedom, the secret to freedom is courage.",
  "Do what makes your soul shine.",
  "Happiness is not by chance, but by choice.",
  "Believe you can and you're halfway there.",
  "Collect moments, not things.",
  "The happiest people don't have the best of everything, they make the best of everything.",
  "Find joy in the ordinary.",
  "Let your happiness bloom.",
  "A happy life is a collection of happy moments.",
  "The only way to do great work is to love what you do.",
  "Be happy for this moment. This moment is your life.",
  "Small steps in the right direction can lead to big destinations.",
  "The future is bright."
];

const sadQuotes = [
  "Tears are words the heart can't express.",
  "The pain you feel today is the strength you'll feel tomorrow.",
  "It's okay not to be okay.",
  "Sometimes, the heart sees what's invisible to the eye.",
  "Even the darkest night will end and the sun will rise.",
  "Sadness is just another emotion.",
  "Healing takes time.",
  "This too shall pass.",
  "It's better to cry than to be angry, because anger hurts others while tears flow silently through the soul and cleans the heart.",
  "The deeper the sorrow, the less grief hurts.",
  "Our sweetest songs are those that tell of saddest thought.",
  "Don't be ashamed to weep; 'tis right to show. The saddest calm, the storm most racks the breast.",
  "The good times of today are the sad thoughts of tomorrow.",
  "Every heart has its secret sorrows which the world knows not; and often times we call a man cold when he is only sad.",
  "Grief is the price we pay for love.",
  "What soap is for the body, tears are for the soul.",
  "Behind every sweet smile, there is a bitter sadness that no one can ever see and feel.",
  "Sometimes you just need to disconnect and enjoy your own company.",
  "The walls we build around us to keep sadness out also keep out the joy.",
  "It's hard to forget someone who gave you so much to remember.",
  "Don't cry because it's over, smile because it happened.",
  "The soul becomes dyed with the color of its thoughts.",
  "To have felt too much is to end in feeling nothing.",
  "There is no greater sorrow than to recall a happy time when miserable.",
  "The only way out of the labyrinth of suffering is to forgive."
];

const excitedQuotes = [
  "The thrill is in the air!",
  "Get ready for amazing things!",
  "Adventure awaits!",
  "Feeling on top of the world!",
  "Can't wait to see what happens next!",
  "Energy is high!",
  "Let's make some memories!",
  "The future is looking bright!",
  "So much to look forward to!",
  "Ready to take on anything!",
  "Feeling absolutely electric!",
  "Brace yourself for awesome!",
  "The best is about to happen!",
  "My heart is racing with excitement!",
  "Living for moments like these!",
  "Full of anticipation!",
  "The possibilities are endless!",
  "Feeling like I can fly!",
  "This is going to be epic!",
  "Jumping for joy!",
  "Can you feel it?!",
  "Something wonderful is on its way!",
  "Absolutely buzzing with excitement!",
  "Let the good times roll!",
  "Ready, set, go!"
];

const relaxedQuotes = [
  "Take a deep breath and relax.",
  "Peaceful moments.",
  "Just breathe.",
  "Finding my calm.",
  "Savoring the stillness.",
  "Letting go of stress.",
  "Inhale peace, exhale worries.",
  "Easy like Sunday morning.",
  "Chasing tranquility.",
  "Finding beauty in simplicity.",
  "Serenity now.",
  "Content and calm.",
  "Enjoying the quiet.",
  "Soaking in the peace.",
  "My happy place.",
  "Unwinding and recharging.",
  "Taking it slow.",
  "The art of doing nothing.",
  "Breathing in the good vibes.",
  "A moment of calm amidst the chaos.",
  "Finding my center.",
  "Rest and rejuvenate.",
  "Embracing the present moment.",
  "Let your worries drift away.",
  "Simply being."
];

const Homepage = () => {
  const user = useCurrentUser();
  const [greeting, setGreeting] = useState('');
  const [savedQuote, setSavedQuote] = useState<string | null>(null);
  const [mood, setMood] = useState('');
  const [complaint, setComplaint] = useState('');


  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Load saved mood and quote from local storage
    const savedMood = localStorage.getItem('mood');
    const savedQuoteData = localStorage.getItem('savedQuote');

    if (savedMood) {
      setMood(savedMood);
    }
    if (savedQuoteData) {
      setSavedQuote(savedQuoteData);
    }

  }, []);


  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
    setSavedQuote(null); // Clear previous quote
  };

  const handleSaveMood = () => {
    if (!mood) {
      alert("Please select your mood before saving.");
      return;
    }

    let quote = '';
    const lowerCaseMood = mood.toLowerCase();

    switch (lowerCaseMood) {
      case 'happy':
        quote = happyQuotes[Math.floor(Math.random() * happyQuotes.length)];
        break;
      case 'sad':
        quote = sadQuotes[Math.floor(Math.random() * sadQuotes.length)];
        break;
      case 'excited':
        quote = excitedQuotes[Math.floor(Math.random() * excitedQuotes.length)];
        break;
      case 'relaxed':
        quote = relaxedQuotes[Math.floor(Math.random() * relaxedQuotes.length)];
        break;
      default:
        quote = `Feeling ${mood}. No specific quote available for this mood.`;
        break;
    }

    setSavedQuote(quote);
    alert(`Mood saved as "${mood}" with a related quote!`);

    // Save to local storage
    localStorage.setItem('mood', mood);
    localStorage.setItem('savedQuote', quote);

    // Optional: Reset mood after saving
    setMood('');
  };

  const handleComplaintChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComplaint(event.target.value);
  };

  const handleSubmitComplaint = async () => {
    if (!complaint.trim()) {
      alert("Please describe the incident before submitting.");
      return;
    }

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: complaint,
          user: {
            name: user?.name || "Unknown User",
            email: user?.email || "No email provided"
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Complaint submitted and sent via email!");
        setComplaint('');
      } else {
        alert("❌ Failed to send the complaint. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen">
      <motion.div
        className="container mx-auto py-6 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <motion.header
          className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {greeting}, {user?.name?.split(' ')[0] || user?.email?.split('@')[0] || "there"}!
            </h1>
            <p className="text-gray-600 mt-1">Welcome to your wellness dashboard</p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/settings"
              className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
            >
              <FaCog className="h-6 w-6" />
            </Link>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Your Profile Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 mr-3">
                <FaUserAlt className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
            </div>

            {user ? (
              <div className="space-y-3">
                <p className="text-gray-700 flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{user.name || "Not set"}</span>
                </p>
                <p className="text-gray-700 flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span className="text-right">{user.email || "Not available"}</span>
                </p>
                <p className="text-gray-700 flex justify-between">
                  <span className="font-medium">Member since:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </p>

                <div className="pt-2 mt-2 border-t border-gray-100">
                  <Link
                    href="/settings"
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
                  >
                    <span>Edit Profile</span>
                    <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-24">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* 2. Track Your Mood Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full text-yellow-600 mr-3">
                <FaSmile className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Track Your Mood</h2>
            </div>

            <p className="text-gray-600 mb-4 text-sm">How are you feeling today?</p>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <button
                onClick={() => handleMoodSelect('Happy')}
                className={`mood-button ${mood === 'Happy' ? 'selected' : ''}`}
              >
                Happy
              </button>
              <button
                onClick={() => handleMoodSelect('Sad')}
                className={`mood-button ${mood === 'Sad' ? 'selected' : ''}`}
              >
                Sad
              </button>
              <button
                onClick={() => handleMoodSelect('Excited')}
                className={`mood-button ${mood === 'Excited' ? 'selected' : ''}`}
              >
                Excited
              </button>
              <button
                onClick={() => handleMoodSelect('Relaxed')}
                className={`mood-button ${mood === 'Relaxed' ? 'selected' : ''}`}
              >
                Relaxed
              </button>
            </div>

            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 w-full transition duration-200 flex items-center justify-center"
              onClick={handleSaveMood}
            >
              <FaChartLine className="mr-2 h-4 w-4" />
              Save Mood
            </button>

            {savedQuote && (
              <div className="mt-4 text-sm italic text-gray-700">
                &quot;{savedQuote}&quot;
              </div>
            )}
            <style jsx global>{`
              .mood-button {
                padding: 8px 16px;
                border-radius: 20px;
                border: 2px solid #e0e0e0;
                background-color: #f0f0f0;
                color: #555;
                cursor: pointer;
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
                font-size: 0.9rem;
                white-space: nowrap;
              }

              .mood-button:hover {
                background-color: #d0d0d0;
                color: #333;
                border-color: #c0c0c0;
              }

              .mood-button.selected {
                background-color: #4CAF50;
                color: white;
                border-color: #388E3C;
              }
              .mood-button.selected:hover{
                 background-color: #4CAF50;
                 color: white;
                 border-color: #388E3C;
              }
            `}</style>
          </motion.div>

          {/* 3. Report an Incident Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600 mr-3">
                <FaExclamationTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Report an Incident</h2>
            </div>

            <p className="text-gray-600 mb-4 text-sm">Please describe any incidents or concerns you would like to report.</p>

            <textarea
              value={complaint}
              onChange={handleComplaintChange}
              placeholder="Describe the incident in detail..."
              className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-vertical focus:ring-2 focus:ring-red-200 focus:border-red-400 transition"
            />

            <button
              onClick={handleSubmitComplaint}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-4 w-full transition duration-200 flex items-center justify-center"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Report
            </button>
          </motion.div>

          {/* 4. AI Solutions Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden relative border border-gray-100"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/ai"
              className="flex flex-col h-full p-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-3">
                  <FaRegLightbulb className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">AI Solutions</h2>
              </div>

              <p className="text-gray-600 text-sm flex-grow">
                Access AI-powered tools for personalized wellness insights and recommendations.
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="bg-indigo-500 text-white py-2 px-4 rounded-lg inline-block hover:bg-indigo-600 transition duration-300 text-center w-full">
                  Explore AI Tools
                </span>
              </div>
            </Link>
          </motion.div>

          {/* 5. Quizzes Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden relative border border-gray-100"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/quizzes"
              className="flex flex-col h-full p-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600 mr-3">
                  <FaQuestionCircle className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Quizzes</h2>
              </div>

              <p className="text-gray-600 text-sm flex-grow">
                Test your knowledge and gain insights about yourself through our interactive quizzes.
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="bg-orange-500 text-white py-2 px-4 rounded-lg inline-block hover:bg-orange-600 transition duration-300 text-center w-full">
                  Take a Quiz
                </span>
              </div>
            </Link>
          </motion.div>

          {/* 6. Experts Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden relative border border-gray-100"
            custom={5}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/experts"
              className="flex flex-col h-full p-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full text-teal-600 mr-3">
                  <FaUserMd className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Expert Connect</h2>
              </div>

              <p className="text-gray-600 text-sm flex-grow">
                Connect with certified professionals for personalized advice and guidance.
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="bg-teal-500 text-white py-2 px-4 rounded-lg inline-block hover:bg-teal-600 transition duration-300 text-center w-full">
                  Find an Expert
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Homepage;

