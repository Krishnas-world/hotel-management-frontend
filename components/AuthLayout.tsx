import React from 'react';
import { Fish } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  image?: string;
  rightContent?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  image,
  rightContent,
}) => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-amber-50">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto">
        {/* Left side with form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div>
              <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors">
                <Fish size={32} className="mr-2" />
                <span className="text-2xl font-bold">DreamCatcher</span>
              </Link>
              <h1 className="mt-6 text-3xl font-extrabold text-slate-900">{title}</h1>
              <p className="mt-2 text-sm text-slate-600">
                {subtitle}
              </p>
            </div>
            {children}
          </div>
        </div>
        
        {/* Right side with image or content */}
        <div className="hidden md:flex md:w-1/2 bg-amber-600 text-white relative overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Login illustration"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700">
              <div className="absolute inset-0 opacity-10 bg-pattern"></div>
            </div>
          )}
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
            {rightContent || (
              <>
                <h2 className="text-3xl font-bold mb-4">Catch Your Biggest Opportunities</h2>
                <p className="mb-6 max-w-md">
                  Become part of our vibrant community of dedicated anglers. Dive into
                  the world of fishing and embark on your exciting journey today.
                  Adventure awaits you on the water!
                </p>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-sm font-medium">
                      {i}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;