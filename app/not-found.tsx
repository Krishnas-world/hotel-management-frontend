// app/not-found.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        {/* Hotel "No Vacancy" Sign */}
        <div className="relative w-64 h-48 mx-auto mb-6">
          {/* Sign background */}
          <div className="absolute inset-0 bg-red-600 rounded-lg border-4 border-gray-800 overflow-hidden">
            {/* "No Vacancy" blinking effect */}
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="text-2xl font-bold text-white tracking-wider">
                NO VACANCY
              </div>
            </div>
            
            {/* Decorative light bulbs around the sign */}
            <div className="absolute top-0 left-0 right-0 flex justify-between px-2 py-1">
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
            </div>
          </div>
          
          {/* Room key */}
          <div className="absolute -bottom-4 right-4 transform rotate-45">
            <div className="w-16 h-6 bg-gray-300 rounded-r-lg flex items-center">
              <div className="w-6 h-6 bg-gray-800 rounded-full ml-1"></div>
              <div className="w-2 h-4 bg-gray-800 ml-8"></div>
            </div>
          </div>
        </div>
        
        {/* Error messages */}
        <h1 className="text-6xl font-bold text-red-600 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Room Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, it seems the room you're looking for has been checked out or doesn't exist in our hotel.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.back()} 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
          <Link href="/">
            <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors">
              Return to Lobby
            </button>
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="mt-8 text-gray-500 text-sm">
        Please contact the front desk at extension #404 for assistance
      </div>
    </div>
  );
}