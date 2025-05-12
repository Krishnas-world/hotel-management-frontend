// components/HotelLoader.tsx
'use client';
import React from 'react';

const HotelLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Hotel Building Animation */}
        <div className="relative w-32 h-40 mb-8">
          {/* Hotel Base */}
          <div className="absolute bottom-0 w-full h-32 bg-blue-600 rounded-t-lg animate-pulse"></div>
          
          {/* Hotel Windows (3x3 grid) */}
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-yellow-300 rounded-sm"></div>
          <div className="absolute bottom-4 left-14 w-6 h-6 bg-yellow-300 rounded-sm"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-yellow-300 rounded-sm"></div>
          
          <div className="absolute bottom-14 left-4 w-6 h-6 bg-yellow-300 rounded-sm"></div>
          <div className="absolute bottom-14 left-14 w-6 h-6 bg-gray-300 rounded-sm"></div>
          <div className="absolute bottom-14 right-4 w-6 h-6 bg-yellow-300 rounded-sm"></div>
          
          <div className="absolute bottom-24 left-4 w-6 h-6 bg-yellow-300 rounded-sm"></div>
          <div className="absolute bottom-24 left-14 w-6 h-6 bg-yellow-300 rounded-sm"></div>
          <div className="absolute bottom-24 right-4 w-6 h-6 bg-gray-300 rounded-sm"></div>
          
          {/* Hotel Roof */}
          <div className="absolute bottom-32 w-full h-8 bg-red-600 rounded-t-lg"></div>
          
          {/* Hotel Door (with animation) */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-brown-500 rounded-t-md animate-bounce"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-xl font-semibold text-blue-800">
          <LoadingText />
        </div>
      </div>
    </div>
  );
};

// Animated Loading Text Component
const LoadingText = () => {
  const [dots, setDots] = React.useState(1);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev < 3 ? prev + 1 : 1);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center">
      <span>Preparing Your Stay</span>
      <span className="w-8 text-left">
        {'.'.repeat(dots)}
      </span>
    </div>
  );
};

export default HotelLoader;